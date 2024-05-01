import express from "express";
import pool from "../db.js";
import multer from "multer";
import fs from "fs";
import Authentication from "../middleware/authorization.js";
import zlib from "zlib";

const router = express.Router();
const UploadMiddleware = multer({ dest: "uploads/" });

// Using multer to save the files

/*
Installation : npm install multer
*/

/*
There Is a problem when i was trying the parse the formdata using multer the error is 
    when you are suppling the value or the file object to the middleware be sure that
    you are passing the name you used in the front end
*/

router.post(
  "/",
  UploadMiddleware.single("media"),
  Authentication,
  async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);
    console.log(newPath);
    fs.readFile(newPath, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const base64String = data.toString("base64");
      fs.unlinkSync(newPath);

      const { title, content, category, tags, summary, posttype, comments } =
        req.body;

      (async () => {
        const response = await pool.query(
          "INSERT INTO posts values ($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp, $9)",
          [
            title,
            base64String,
            content,
            category,
            tags,
            summary,
            posttype,
            comments,
            req.user.user_id,
          ]
        );
      })();
    });

    res.status(200).json({ success: "Ok" });
  }
);

export default router;

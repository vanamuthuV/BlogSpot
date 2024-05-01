import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();
const Profile = multer({ dest: "profileimages/" });

router.post("/", Authentication, Profile.single("media"), async (req, res) => {
  console.log(req.file);
  console.log("Hey Boy");
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);

  const { user_id } = req.body;
  console.log(user_id);

  fs.readFile(newPath, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const base64String = data.toString("base64");
    fs.unlinkSync(newPath);

    (async () => {
      try {
        const query = `
        insert into profilepicture values ($1, $2, current_timestamp)
    `;
        const query1 = `
        select * from profilepicture where user_id = $1
      `;

        await pool.query(query, [user_id, base64String]);
        const imgPath = await pool.query(query1, [user_id]);
        console.log(imgPath.rows);
        res.status(200).json({ data: imgPath.rows });
      } catch (error) {
        console.log(error);
        res.status(200).json({ data: error });
      }
    })();
  });
});

router.put("/", Authentication, Profile.single("media"), async (req, res) => {
  const { user_id } = req.body;
  console.log(req.file);
  console.log("Hey Boy");
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);
  console.log(req.body.user_id);
  console.log(newPath);

  fs.readFile(newPath, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const base64String = data.toString("base64");
    fs.unlinkSync(newPath);

    (async () => {
      try {
        const query = `
        update profilepicture set profileimage = $1, profiletime = current_timestamp where user_id = $2
    `;

        const query1 = `
        select * from profilepicture where user_id = $1
      `;

        await pool.query(query, [base64String, user_id]);
        const imgPath = await pool.query(query1, [user_id]);
        res.status(200).json({ data: imgPath.rows });
      } catch (error) {
        console.log(error);
        res.status(200).json({ data: error });
      }
    })();
  });
});

export default router;

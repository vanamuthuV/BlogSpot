import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();
const Cover = multer();

router.post("/", Authentication, Cover.none(), async (req, res) => {
  console.log(req.file);
  console.log("Hey Boy");
  console.log("HHH");
  // const { originalname, path } = req.file;
  // const parts = originalname.split(".");
  // const extension = parts[parts.length - 1];
  // const newPath = path + "." + extension;
  // fs.renameSync(path, newPath);

  const { user_id, media } = req.body;

  // fs.readFile(newPath, (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }

  //   const base64String = data.toString("base64");
  //   fs.unlinkSync(newPath);

  (async () => {
    try {
      const query = `
        insert into coverpicture values ($1, $2, current_timestamp)
    `;
      const query1 = `
        select * from coverpicture where user_id = $1
      `;

      await pool.query(query, [user_id, media]);
      const imgPath = await pool.query(query1, [user_id]);
      res.status(200).json({ data: imgPath.rows });
    } catch (error) {
      console.log(error);
      res.status(200).json({ data: error });
    }
  })();
});

router.put("/", Authentication, Cover.none(), async (req, res) => {
  const { user_id, media} = req.body;
  // const { originalname, path } = req.file;
  // const parts = originalname.split(".");
  // const extension = parts[parts.length - 1];
  // const newPath = path + "." + extension;
  // fs.renameSync(path, newPath);

  // fs.readFile(newPath, (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }

  //   const base64String = data.toString("base64");
  //   fs.unlinkSync(newPath);

  (async () => {
    try {
      const query = `
        update coverpicture set coverimage = $1, covertime = current_timestamp where user_id = $2
    `;

      const query1 = `
        select * from coverpicture where user_id = $1
      `;

      await pool.query(query, [media, user_id]);
      const imgPath = await pool.query(query1, [user_id]);
      res.status(200).json({ data: imgPath.rows });
    } catch (error) {
      console.log(error);
      res.status(200).json({ data: error });
    }
  })();
});

export default router;

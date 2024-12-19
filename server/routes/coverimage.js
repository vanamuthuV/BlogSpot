import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post("/", Authentication, async (req, res) => {
  console.log("File", req.file);

  const { user_id, media } = req.body;

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

router.put("/", Authentication, async (req, res) => {
  const { user_id, media } = req.body;

  console.log(req.body)

  console.log(
    "This is media",
    media
  ); (async () => {
    try {
      const query = `
        update coverpicture set coverimage = $1, covertime = current_timestamp where user_id = $2
    `;

      const query1 = `
        select * from coverpicture where user_id = $1
      `;

      await pool.query(query, [media, user_id]);
      const imgPath = await pool.query(query1, [user_id]);
      console.log(imgPath);
      res.status(200).json({ data: imgPath.rows });
    } catch (error) {
      console.log(error);
      res.status(200).json({ data: error });
    }
  })();
});

export default router;

import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { id } = req.body;

  const query = `
       select * from users 
        left join comments on users.user_id = comments.user_id
        left join profilepicture on users.user_id = profilepicture.user_id
        where comments.post_id = $1 ORDER BY comments.comment_time DESC
    `;

  try {
    const comments = await pool.query(query, [id]);
    res.status(200).json({ data: comments.rows });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

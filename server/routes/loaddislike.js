import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post("/", Authentication, async (req, res) => {
  console.log(req.body);
  const { user_id } = req?.body;

  const query = `
       select * from likes join users on users.user_id = likes.user_id join
posts on posts.post_id = likes.post_id where likes.user_id = $1 and likes.dislikes = true
    `;

  try {
    const DisLikes = await pool.query(query, [user_id]);
    res.status(200).json({ data: DisLikes.rows });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

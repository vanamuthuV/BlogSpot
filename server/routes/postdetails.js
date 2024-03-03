import express from "express";
import pool from "../db.js";

const router = express.Router();

const query = `
    SELECT * from users
    join posts on users.user_id = posts.user_id
    left outer join profilepicture on profilepicture.user_id = users.user_id
    left outer join profileinformation on users.user_id = profileinformation.user_id
    where posts.post_id = $1
`;

const query1 = `
  SELECT * from follow where follower_id = $1  and following_id = $2
`;

router.post("/", async (req, res) => {
 
  try {
    const post = await pool.query(query, [req.body.id]);

    res.status(200).json({ post: post.rows[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

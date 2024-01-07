import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const posts = await pool.query(
      "SELECT * FROM users JOIN posts ON users.user_id = posts.user_id"
    );
    console.log(posts.rows);
    res.status(200).json({ posts: posts.rows });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

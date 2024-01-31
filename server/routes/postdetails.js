import express from "express"
import pool from "../db.js"

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const post = await pool.query("SELECT * from users join posts on users.user_id = posts.user_id where posts.post_id = $1", [req.body.id])

        res.status(200).json({post : post.rows[0]})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
});

export default router;
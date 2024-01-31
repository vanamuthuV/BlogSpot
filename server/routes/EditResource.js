import express from "express";
import Authentication from "../middleware/authorization.js";
import pool from "../db.js";

const router = express.Router();

router.post('/', Authentication, async (req, res) => {
    const { post_ids } = req?.body?.data

    const querey = `select * from posts where post_id = $1`

    const post = await pool.query(querey, [post_ids])

    res.status(200).json({data : post.rows})
})

export default router;
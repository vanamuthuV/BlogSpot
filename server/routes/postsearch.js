import expres from "express";
import pool from "../db.js";

const router = expres.Router();

router.post("/", async (req, res) => {
  console.log(req.body);

    const { postName } = req?.body;

    if (postName === "") return res.status(200).json({ data: [] });

    const query = `
        select * from posts join users on posts.user_id = users.user_id where post_title like $1
    `

    try {
        const Posts = await pool.query(query, [`${postName}%`])
        res.status(200).json({ data: Posts.rows });
    } catch (error) {
        console.log(error);
        res.status(200).json({data : error})
    }
  
});

export default router;

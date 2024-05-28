import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.put("/",Authentication, async (req, res) => {
    const { newComment, commentID, postID } = req.body;
    
    const query = `
        update comments set comment = $1, isedited = true where comment_id = $2
    `

    const query1 = `
      select * from users 
        left join comments on users.user_id = comments.user_id
        left join profilepicture on users.user_id = profilepicture.user_id
        where comments.post_id = $1 ORDER BY comments.comment_time DESC
    `;

    try {
        await pool.query(query, [newComment, commentID])
        const Comment = await pool.query(query1, [postID])
        res.status(200).json({ data: Comment.rows });
    } catch (error) {
        console.log(error);
        res.status(200).json({data : error})
    }

    
})

export default router;
import express from "express"
import pool from "../db.js"
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post('/', Authentication, async (req, res) => {
    console.log(req.body);
    const { comment, user_id, post_id } = req.body.data
    
    const query = `
    insert into comments values ($1, $2, $3, current_timestamp, false)
    `

     const query1 = `
        select * from users join comments on users.user_id = comments.user_id where comments.post_id = $1;
    `;

    try {
        await pool.query(query, [user_id, post_id, comment]);
         const comments = await pool.query(query1, [post_id]);
        res.status(200).json({ data: comments.rows });
    } catch (error) {
        console.log(error)
        res.status(200).json({data : error})
    }
})

export default router;
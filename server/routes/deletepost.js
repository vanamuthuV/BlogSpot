import express from "express"
import pool from "../db.js"
import Authentication from "../middleware/authorization.js"

const router = express.Router();

router.delete("/:id",  async (req, res) => {
    console.log("Hola");
    console.log(req.params.id);
    console.log(req?.body);

    const Parse = req?.params?.id.split('.')
    console.log(Parse);
    const post_id = Parse[0]
    const user_name = Parse[1]

    const query = `
        delete from posts where post_id = $1
    `

    const query1 = `
        select * from users join posts on users.user_id = posts.user_id where posts.post_type = 'public' and users.user_name = $1
    `;

    const query2 = `
     select * from users join posts on users.user_id = posts.user_id where posts.post_type = 'private' and users.user_name = $1
    `;

    try {
        await pool.query(query, [post_id])
        const PublicPost = await pool.query(query1, [user_name])
        const PrivatePost = await pool.query(query2, [user_name])
        res.status(200).json({
            data: {
                PublicPost: PublicPost.rows,
                PrivatePost : PrivatePost.rows
        } });
    } catch (error) {
        res.status(200).json({data : error})
    }

    
})

export default router;
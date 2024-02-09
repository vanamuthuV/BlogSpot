import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post("/",Authentication, async (req, res) => {
    console.log(req.body);
    const { user_id } = req?.body
    
    const query = `
         select * from favorite join posts on favorite.post_id = posts.post_id join users on users.user_id = favorite.user_id where favorite.user_id = $1 
    `;

    try {
        const Favorites = await pool.query(query, [user_id])
            res.status(200).json({ data: Favorites.rows });
    } catch (error) {
        console.log(error)
            res.status(200).json({ data: error });
    }


})

export default router;
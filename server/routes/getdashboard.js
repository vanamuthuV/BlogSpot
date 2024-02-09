import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";
import { populate } from "dotenv";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { user_id } = req?.body;
  console.log(user_id);

  const query = `
        select * from favorite join posts on favorite.post_id = posts.post_id join users on users.user_id = favorite.user_id where favorite.user_id = $1 
    `;

  const query1 = `
        select * from likes join users on users.user_id = likes.user_id join 
posts on posts.post_id = likes.post_id where likes.user_id = $1 and likes.likes = true 
    `;

  const query2 = `
        select * from likes join users on users.user_id = likes.user_id join
posts on posts.post_id = likes.post_id where likes.user_id = $1 and likes.dislikes = true
    `;

  try {
    const Favorites = await pool.query(query, [user_id]);
    const Likes = await pool.query(query1, [user_id]);
    const DisLikes = await pool.query(query2, [user_id]);
    console.log(Favorites.rows);
    res.status(200).json({
      data: {
        Favorites: Favorites?.rows,
        Likes: Likes.rows,
        DisLikes: DisLikes.rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

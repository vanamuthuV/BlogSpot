import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";
import { populate } from "dotenv";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { user_id, preferences } = req?.body;
  console.log(user_id);
  console.log(preferences);

  const query = `select * from bookmark join posts on bookmark.post_id = posts.post_id join
users on users.user_id = bookmark.user_id where bookmark.user_id = $1`;

  const query1 = `
        select * from favorite join posts on favorite.post_id = posts.post_id join users on users.user_id = favorite.user_id where favorite.user_id = $1 
    `;

  const query2 = `
        select * from likes join users on users.user_id = likes.user_id join 
posts on posts.post_id = likes.post_id where likes.user_id = $1 and likes.likes = true 
    `;

  const query3 = `
        select * from likes join users on users.user_id = likes.user_id join
posts on posts.post_id = likes.post_id where likes.user_id = $1 and likes.dislikes = true
    `;

  try {
    if (preferences === "Bookmark") {
      const Favorites = await pool.query(query, [user_id]);
      console.log(Favorites.rows);
      res.status(200).json({
        data: {
          data: Favorites?.rows,
        },
      });
    }

    if (preferences === "Likes") {
      const Likes = await pool.query(query2, [user_id]);
      console.log(Likes.rows)
      res.status(200).json({
        data: {
          data: Likes?.rows,
        },
      });
    }

    if (preferences === "Dislikes") {
      const DisLikes = await pool.query(query3, [user_id]);
      console.log(DisLikes.rows)
      res.status(200).json({
        data: {
          data: DisLikes?.rows,
        },
      });
    }

    if (preferences === "Favorites") {
      const Favorites = await pool.query(query1, [user_id]);
      res.status(200).json({
        data: {
          data: Favorites?.rows,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

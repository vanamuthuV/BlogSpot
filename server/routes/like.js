import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post("/", Authentication, async (req, res) => {
  console.log(req.body);
  const { post_id, user_id } = req?.body;

  const query = `
        select * from likes where user_id = $1 and post_id = $2
    `;

  const query1 = `
        insert into likes values ($1, $2, true, false, current_timestamp);
    `;

  const query2 = `
        update likes set likes = true, dislikes = false, like_time = current_timestamp where
        user_id = $1 and post_id = $2
    `;

  const query3 = `
    select * from likes where post_id = $1 and likes = true
  `;

  const query4 = `
    select * from likes where post_id = $1 and dislikes = true
  `;

  try {
    const isLike = await pool.query(query, [user_id, post_id]);
    console.log(isLike?.rows.length);
    if (isLike?.rows.length === 0) {
      await pool.query(query1, [user_id, post_id]);
    } else {
      await pool.query(query2, [user_id, post_id]);
    }

    const Like = await pool.query(query, [user_id, post_id]);
    const TotalLike = await pool.query(query3, [post_id]);
    const TotalDisLike = await pool.query(query4, [post_id]);

    res.status(200).json({
      data: {
        Like: Like?.rows[0],
        TotalLike: TotalLike.rows,
        TotalDisLike : TotalDisLike.rows
      },
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

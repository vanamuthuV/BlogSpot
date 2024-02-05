import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post("/", Authentication, async (req, res) => {
  const { user_id, post_id } = req?.body?.data;

  const query = `
        insert into favorite values ($1, $2, current_timestamp)
    `;
  const query1 = `
        select * from favorite where user_id = $1 and post_id = $2
    `;

  try {
    console.log(req.body);

    await pool.query(query, [user_id, post_id]);

    const Favorite = await pool.query(query1, [user_id, post_id]);

    res
      .status(200)
      .json({ data: Favorite?.rows?.length === 0 ? {} : Favorite?.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

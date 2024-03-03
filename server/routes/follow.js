import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post("/", Authentication, async (req, res) => {
  const query = `
        select * from users where user_name = $1
    `;

  const query1 = `
        insert into follow values ($1, $2, current_timestamp)
    `;

  const query2 = `
        select * from follow where follower_id = $1 and following_id = $2
    `;

  console.log(req.body);
  const { user_id } = req?.body?.data;
  const { user_name } = req?.body?.data?.follower_name;
  console.log(user_id, user_name);

  try {
    const User = await pool.query(query, [user_name]);
    console.log(User.rows[0].user_id);
    const Follower_id = User?.rows[0]?.user_id;

    await pool.query(query1, [user_id, Follower_id]);

    const FollowConfirmer = await pool.query(query2, [user_id, Follower_id]);

    res.status(200).json({ data: FollowConfirmer.rows });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});

export default router;

import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);

  const user_name = req?.body?.data?.user_name;

  const query = `
        select * from users where user_name = $1
    `;

  const query1 = `
    select * from follow 
join users on users.user_id = follow.following_id
left outer join profilepicture on profilepicture.user_id = follow.following_id
left outer join profileinformation on profileinformation.user_id = follow.following_id
where follow.follower_id = $1
    `;

  try {
    const user = await pool.query(query, [user_name]);
    const { user_id } = user.rows[0];
    console.log(user_id);

    const Followings = await pool.query(query1, [user_id]);

    res.status(200).json({ data: Followings.rows });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});

export default router;

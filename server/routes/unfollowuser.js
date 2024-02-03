import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.delete("/:id", Authentication, async (req, res) => {
  const { id } = req.params;
  const Data = id.split("..");
  console.log(Data[0], Data[1]);

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

  const query2 = `
        delete from follow where follow_id = $1
    `;

  try {
    const user = await pool.query(query, [Data[1]]);

    const { user_id } = user.rows[0];

    await pool.query(query2, [Data[0]]);

    const Users = await pool.query(query1, [user_id]);
    console.log(user.rows);
    res.status(200).json({ data: Users.rows });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});

export default router;

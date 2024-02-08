import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.put("/", Authentication, async (req, res) => {
  console.log(req.body);

  const { user_email, user_id } = req?.body;

  const query = `
        update users set user_email = $1 where user_id = $2
    `;

  const query1 = `
        select * from users left outer join profilepicture on users.user_id = profilepicture.user_id where users.user_id = $1
    `;

  try {
    await pool.query(query, [user_email, user_id]);
    const user = await pool.query(query1, [user_id]);
    const obj = Object.assign({}, req.user, user.rows[0]);
    res.status(200).json({ data: obj });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  console.log(username);

  const query = `
    select * from users where user_name = $1
  `;

  try {
    const Users = await pool.query(query, [username]);
    console.log(Users.rows.length);
    res.status(200).json({ data: Users.rows.length === 0 ? true : false });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});

export default router;

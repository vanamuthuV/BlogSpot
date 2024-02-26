import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  console.log(email);

  const query = `
    select * from users where user_email = $1
  `;

  try {
    const Users = await pool.query(query, [email]);
    console.log(Users.rows.length);
    res.status(200).json({ data: Users.rows.length === 0 ? true : false });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});

export default router;

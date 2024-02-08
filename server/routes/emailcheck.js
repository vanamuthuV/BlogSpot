import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post("/",Authentication, async (req, res) => {
  console.log(req.body);

  const { user_email } = req.body;

  const query = `
        select * from users where user_email = $1
    `;

  try {
    const Users = await pool.query(query, [`${user_email}`]);

    res.status(200).json({ data: Users.rows.length === 0 ? true : false });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});
export default router;

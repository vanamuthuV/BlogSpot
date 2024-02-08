import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.put("/", Authentication, async (req, res) => {
  console.log(req?.body);

  const { user_id, new_password } = req?.body;

  const hashPassword = await bcrypt.hash(new_password, 10);
    const query = `
        update users set user_password = $1 where user_id = $2
    `
    try {
        await pool.query(query, [hashPassword, user_id])
        res.status(200).json({ data: true });
    } catch (error) {
        console.log(error);
          res.status(200).json({ data: false });
    }

});

export default router;

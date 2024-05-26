import express from "express";
import pool from "../db.js"
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, passcode } = req.body;
    const HashedPasscode = await bcrypt.hash(passcode, 10);
    const NewUser = await pool.query(
      "INSERT INTO users values($1, $2,  CURRENT_TIMESTAMP, $3, 'manual_user', 'manual', false)",
      [username, email, HashedPasscode]
    );
    res.status(200).json({ statusMessage:'Successfully Registered', Status : true , data: "Registration Successfull!!" });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({statusMessage : 'Sorry! problem at our end!', Status : false, error: error.message });
  }
});

export default router;

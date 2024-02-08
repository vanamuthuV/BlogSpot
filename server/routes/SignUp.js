import express from "express";
import pool from "../db.js"
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, passcode } = req.body;
    const HashedPasscode = await bcrypt.hash(passcode, 10);
    const NewUser = await pool.query(
      "INSERT INTO users values($1, $2, $3,  CURRENT_TIMESTAMP)",
      [username, email, HashedPasscode]
    );
    res.send("Insertion Success");
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
});

export default router;

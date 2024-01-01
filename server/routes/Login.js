import pool from "../db.js";
import bcrypt from "bcrypt";
import express from "express";
import jwtToken from "../utils/jwtToken.js";
import cookieParser from "cookie-parser";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, passcode } = req.body;
    if ((email == undefined) | (passcode == undefined))
      return res
        .status(403)
        .json({ message: "Please Enter The Credentials To Verify !!" });
    const User = await pool.query("SELECT * from users WHERE user_email = $1", [
      email
    ]);

    if (User.rows.length == 0)
      return res.status(404).json({ message: `No User Found On ${email}` });

    const valid = await bcrypt.compare(passcode, User.rows[0].user_password);
    if (valid) {
      const Token = jwtToken(User.rows[0]);
      res.cookie("refresh_token", Token.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      console.log(Token);
      res.status(200).json({ accessToken: Token.accessToken, refreshToken: Token.refreshToken, user_details: User.rows });
    } else return res.status(401).json({ message: "Incorrect Credentials" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// config = {
//   Headers: {
//     'Authorization': 'Bearer' + token
//   }
// }

export default router;

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
        .json({ login_status : "Please Enter the credentials to proceed" });
    const User = await pool.query("SELECT * from users join profilepicture on users.user_id = profilepicture.user_id WHERE users.user_email = $1", [
      email
    ]);

    if (User.rows.length == 0)
      return res.status(404).json({ login_status : "Not Yet Registered!!" });

    const valid = await bcrypt.compare(passcode, User.rows[0].user_password);
    if (valid) {
      const Token = jwtToken(User.rows[0]);
      res.cookie("refresh_token", Token.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({ accessToken: Token.accessToken, refreshToken: Token.refreshToken, user_details: User.rows, login_status : true});
    } else return res.status(401).json({ message: "Incorrect Credentials" });
  } catch (error) {
    res.status(401).json({ error: error.message , login_status : "Problem at our end, sorry!!"});
  }
});

// config = {
//   Headers: {
//     'Authorization': 'Bearer' + token
//   }
// }

export default router;
import pool from "../db.js";
import bcrypt from "bcrypt";
import express from "express";
import jwtToken from "../utils/jwtToken.js";
import cookieParser from "cookie-parser";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, passcode } = req.body;
    console.log("Hello Man");
    console.log(req.body);
    console.log(email, passcode);
    if ((email == undefined) | (passcode == undefined))
      return res
        .status(403)
        .json({ login_status: "Please Enter the credentials to proceed" });
    const User = await pool.query(
      "SELECT * from users left outer join profilepicture on users.user_id = profilepicture.user_id WHERE users.user_email = $1",
      [email]
    );

    console.log("Hoo");
    console.log(User.rows);

    if (User.rows.length === 0) {
      console.log("Hello");
      return res.status(401).json({ login_status: "Not Yet Registered!!" });
    }

    const valid = await bcrypt.compare(passcode, User.rows[0].user_password);
    if (valid) {
      const Token = jwtToken(User.rows[0]);
      res.cookie("refresh_token", Token.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      console.log(Token);
      res.status(200).json({
        accessToken: Token.accessToken,
        refreshToken: Token.refreshToken,
        user_details: User.rows,
        login_status: "Login Success",
      });
      console.log(User.rows);
    } else {
      console.log("Ho Mna");
      return res.status(401).json({ login_status: "Incorrect Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error.message,
      login_status: "Problem at our end, sorry!!",
    });
  }
});

// config = {
//   Headers: {
//     'Authorization': 'Bearer' + token
//   }
// }

export default router;

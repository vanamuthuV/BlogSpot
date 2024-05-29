import nodemailer from "nodemailer";
import dotenv from "dotenv";
import pool from "../db.js";

dotenv.config();

import expres from "express";

const router = expres.Router();

const query = `
        select * from users left join profilepicture on users.user_id = profilepicture.user_id where users.user_id = $1
    `;

const query1 = `
    UPDATE users SET verified = true WHERE user_id = $1;
    
`;

router.post("/", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  console.log(req.body?.email);
  //   const { email } = req?.body?.data;
  //   console.log(email);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "inkwellify@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
    from: "inkwellify@gmail.com",
  });

  const emailContent = `
    <div>
    <center>
      <h1 style="margin: 0; color: #f97316;"><span style="color: #4d4d4d;">Ink</span>Wellify</h1>
    </center>
    <p>This is the code to verify your Gmail with InkWellify.com - <span style="color: blue;">${randomNumber}</span></p>
  </div>
`;

  transporter
    .sendMail({
      to: req.body?.email,
      subject: "Account Verification With InkWellify.com",
      html: emailContent,
      from: "inkwellify@gmail.com",
    })
    .then(() => {
      console.log("Email Sent");
      res.status(200).json({ status: true, OTPs: randomNumber });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ status: false });
    });
});

router.post("/confirm", async (req, res) => {
  console.log(req.body?.user_id);
    try {
        await pool.query(query1, [req.body?.user_id]);
        const users = await pool.query(query, [req?.body?.user_id]);
        res.status(200).json({ data: users.rows[0], status: true });
    } catch (error) {
        res.status(200).json({ data: 'error', status: false });
    }
});

export default router;

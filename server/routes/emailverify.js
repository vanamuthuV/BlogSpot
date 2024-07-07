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
      subject:
        "Account Verification With InkWellify.com",
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
    res.status(200).json({ data: "error", status: false });
  }
});

const queryexists = `select * from users where user_email = $1 and platform = 'manual'`;

router.post("/reset", async (req, res) => {
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
    <html>
    <body>
        <div style="text-align: center;">
            <h1 style="margin: 0; color: #f97316;">InkWellify</h1>
        </div>
        <p style="text-align: center;">This is the code to reset your password with Inkwellify.com - <span style="color: blue;">${randomNumber}</span></p>
    </body>
    </html>
`;

  try {
    const users = await pool.query(queryexists, [req?.body?.email]);
    console.log("I Want user", users);
    if (users.rows.length !== 0) {
      transporter
        .sendMail({
          to: req.body?.email,
          subject: "Password Reset With InkWellify.com",
          html: emailContent,
          from: "inkwellify@gmail.com",
        })
        .then(() => {
          console.log("Email Sent");
          res.status(200).json({
            status: true,
            OTPs: randomNumber,
            message: "OTP Dispatch Success",
            variant: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(200).json({
            status: false,
            message: "Unable To Dispatch OTP",
            variant: "error",
            danger: 200,
          });
        });
    } else {
      res.status(200).json({
        statusbar: false,
        message: "Unable to Dispatch OTP, User Unregistered Or Goolge Login User",
        variant: "error",
        danger : 100
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;

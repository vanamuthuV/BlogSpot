import { sendResponse } from "../utils/responder.js";
import { pool } from "../db/db.js";
import {
  usernamecheckscripts,
  updateusernamescript,
  useremailcheckscripts,
  updateuseremailscript,
  verifyscript,
  getuserscript,
  updatepasswordbyidscript,
  deleteaccountscript,
  updatepasswordbyemailscript
} from "../db/query.js";
import jwtToken from "../utils/jwtToken.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const checkusername = async (req, res) => {
  const { value } = req.params;
  console.log(value);
  const users = await pool.query(usernamecheckscripts, [value]);
  console.log(users.rows);
  return sendResponse({
    code: 200,
    message: "Username fetch success",
    res,
    success: true,
    data: users.rows,
  });
};

const updateusername = async (req, res) => {
  const { user_name } = req?.body;
  const { user_id } = req.user;

  if (!user_name) {
    return sendResponse({
      code: 400,
      message: "Username update failed",
      res,
      success: false,
      data: null,
    });
  }

  const user = await pool.query(updateusernamescript, [user_name, user_id]);

  const { accessToken, refreshToken } = await jwtToken({ user: user.rows[0] });

  return sendResponse({
    code: 200,
    message: "Username updated",
    res,
    success: true,
    data: accessToken,
  });
};

const checkuseremail = async (req, res) => {
  const { value } = req.params;
  console.log(value);
  const users = await pool.query(useremailcheckscripts, [value]);

  return sendResponse({
    code: 200,
    message: "Email fetch success",
    res,
    success: true,
    data: users.rows,
  });
};

const updateuseremail = async (req, res) => {
  const { user_email, user_id } = req?.body;

  if (!user_email) {
    return sendResponse({
      code: 400,
      message: "Useremail update failed",
      res,
      success: false,
      data: null,
    });
  }

  const user = await pool.query(updateuseremailscript, [user_email, user_id]);

  const { accessToken, refreshToken } = await jwtToken({ user: user.rows[0] });

  return sendResponse({
    code: 200,
    message: "Email updated",
    res,
    success: true,
    data: accessToken,
  });
};

const emailverifyotpdispatch = async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  const { email, type } = req?.body;

  if (!email) {
    return sendResponse({
      code: 400,
      message: "Cannot find email",
      res,
      success: false,
      data: null,
    });
  }

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
      <p>This is the code to ${
        type === "pass" ? "reset your password " : "verify your Gmail"
      } with InkWellify.com - <span style="color: blue;">${randomNumber}</span></p>
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
      return sendResponse({
        code: 200,
        message: "OTP dispatched",
        res,
        success: true,
        data: randomNumber,
      });
    })
    .catch((err) => {
      console.log(err);
      return sendResponse({
        code: 500,
        message: "Cannot dispatch OTP",
        res,
        success: false,
        data: null,
      });
    });
};

const verifyemail = async (req, res) => {
  const { user_id } = req.body;

  await pool.query(verifyscript, [user_id]);
  return sendResponse({
    code: 200,
    message: "Email verified",
    res,
    success: true,
    data: null,
  });
};

const verifyoldpassword = async (req, res) => {
  const { user_passcode } = req.body;
  const { user_id } = req.user;

  const user = await pool.query(getuserscript, [user_id]);

  if (user?.rows?.length === 0)
    return sendResponse({
      code: 400,
      message: "Cannot find user",
      res,
      success: false,
      data: null,
    });

  const isValid = await bcrypt.compare(
    user_passcode,
    user?.rows[0].user_password
  );

  return sendResponse({
    code: 200,
    message: "Old password verified",
    res,
    success: isValid,
    data: isValid,
  });
};

const updatepasswordbyuserid = async (req, res) => {
  const { new_password } = req?.body;
  const { user_id } = req.user;

  if (!new_password) {
    return sendResponse({
      code: 400,
      message: "Cannot update password",
      res,
      success: false,
      data: null,
    });
  }

  const hashPassword = await bcrypt.hash(new_password, 10);

  await pool.query(updatepasswordbyidscript, [hashPassword, user_id]);
  return sendResponse({
    code: 200,
    message: "Password updated",
    res,
    success: true,
    data: true,
  });
};

const deleteaccount = async (req, res) => {
  const { user_id } = req.user;

  await pool.query(deleteaccountscript, [user_id]);

  return sendResponse({
    code: 200,
    message: "Account deletion success",
    res,
    success: true,
    data: true,
  });
};

const updatepasswordbyuseremail = async (req, res) => {
  const { user_email, new_password } = req?.body;


  if (!new_password || !user_email) {
    return sendResponse({
      code: 400,
      message: "Cannot update password",
      res,
      success: false,
      data: null,
    });
  }

  const hashPassword = await bcrypt.hash(new_password, 10);

  await pool.query(updatepasswordbyemailscript, [hashPassword, user_email]);
  return sendResponse({
    code: 200,
    message: "Password updated",
    res,
    success: true,
    data: true,
  });
};

export {
  checkusername,
  updateusername,
  checkuseremail,
  updateuseremail,
  emailverifyotpdispatch,
  verifyemail,
  verifyoldpassword,
  updatepasswordbyuserid,
  deleteaccount,
  updatepasswordbyuseremail
};

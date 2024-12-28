import { sendResponse } from "../utils/responder.js";
import { pool } from "../db/db.js";
import bcrypt from "bcrypt";
import jwtToken from "../utils/jwtToken.js";
import {
  loginScript,
  signupscript,
  usernamecheckscript,
  emailcheckscript,
  unuecheckscript,
  reloaduserscript,
} from "../db/query.js";

const login = async (req, res) => {
  const { email, passcode } = req?.body;

  console.log(email, passcode);

  if (!email || !passcode) {
    return sendResponse({
      code: 400,
      data: null,
      message: "Fields are empty",
      res,
      success: false,
    });
  }

  const user = await pool.query(loginScript, [email]);

  if (user.rows.length === 0) {
    return sendResponse({
      code: 404,
      data: null,
      message: "User doesn't exist",
      res,
      success: false,
    });
  }

  console.log("user", user.rows);

  const valid = await bcrypt.compare(passcode, user.rows[0].user_password);

  if (valid) {
    const { accessToken, refreshToken } = await jwtToken({
      user: user.rows[0],
    });

    return sendResponse({
      code: 200,
      data: {
        accessToken,
        refreshToken,
        user: user.rows,
      },
      message: "Login success",
      res,
      success: true,
    });
  } else {
    return sendResponse({
      code: 401,
      data: null,
      message: "Incorrect credentials",
      res,
      success: false,
    });
  }
};

const singup = async (req, res) => {
  const { username, email, passcode } = req?.body;

  if (!username || !email || !passcode) {
    return sendResponse({
      code: 400,
      message: "Fields are empty",
      res,
      success: true,
      data: null,
    });
  }

  const isExits = await pool.query(unuecheckscript, [username, email]);

  if (isExits.rowCount !== 0) {
    return sendResponse({
      code: 409,
      message:
        "Oops! This username or email is already taken. Try another one!",
      res,
      success: false,
      data: null,
    });
  }

  const HashedPasscode = await bcrypt.hash(passcode, 10);
  await pool.query(signupscript, [username, email, HashedPasscode]);

  return sendResponse({
    code: 200,
    message:
      "Welcome Creator! Please log in to start your journey on Inkwellify",
    res,
    success: 200,
    data: null,
  });
};

const usernamechecker = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return sendResponse({
      code: 400,
      message: "Fields are empty",
      res,
      success: false,
      data: null,
    });
  }

  const users = await pool.query(usernamecheckscript, [username]);

  return sendResponse({
    code: 200,
    message:
      users.rows.length === 0 ? "Username available" : "Username already taken",
    res,
    success: true,
    data: users.rows.length === 0 ? true : false,
  });
};

const emailchecker = async (req, res) => {
  const { user_email } = req.body;

  const users = await pool.query(emailcheckscript, [`${user_email}`]);

  return sendResponse({
    code: 200,
    message:
      users.rows.length === 0 ? "Email available" : "Email already taken",
    res,
    success: true,
    data: users.rows.length === 0 ? true : false,
  });
};

const reloaduser = async (req, res) => {
  const { user_id } = req.user;
  const { accessToken } = req?.user;

  console.log(req.user)

  console.log(accessToken);

  const Profile = await pool.query(reloaduserscript, [user_id]);
  const user = Object.assign({}, req.user, Profile.rows[0], {
    accessToken,
  });

  return sendResponse({
    code: 200,
    message: "Session fetch successfull",
    res,
    success: true,
    data: user,
  });
};

export { login, singup, usernamechecker, emailchecker, reloaduser };

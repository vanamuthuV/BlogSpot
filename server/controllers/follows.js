import { pool } from "../db/db.js";
import {
  addfollowscript,
  deletefollowscript,
  getfollowersscript,
  getfollowingscript,
  fetchfromusernamescript,
  checkfollowscript,
} from "../db/query.js";
import { sendResponse } from "../utils/responder.js";

const addfollow = async (req, res) => {
  const { id } = req?.params;
  const { user_id } = req?.user;

  if (!id || !user_id) {
    return sendResponse({
      code: 400,
      message: "Something went wrong",
      res,
      success: false,
      data: null,
    });
  }

  const follow = await pool.query(addfollowscript, [user_id, id]);

  return sendResponse({
    code: 200,
    message: "Follow success",
    res,
    success: true,
    data: follow.rows,
  });
};

const removefollow = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse({
      code: 400,
      message: "Something went wrong",
      res,
      success: false,
      data: null,
    });
  }

  await pool.query(deletefollowscript, [id]);

  return sendResponse({
    code: 200,
    message: "Unfollow success",
    res,
    success: true,
    data: null,
  });
};

const follows = async (req, res) => {
  const { user_name } = req.params;

  const user = await pool.query(fetchfromusernamescript, [user_name]);

  if (!user) {
    return sendResponse({
      code: 404,
      message: "User unavailable",
      res,
      success: false,
      data: {
        followers: [],
        followigns: [],
      },
    });
  }

  const { user_id } = user.rows[0];

  const Followers = await pool.query(getfollowersscript, [user_id]);
  const Followings = await pool.query(getfollowingscript, [user_id]);

  return sendResponse({
    code: 200,
    message: "Follows fetch success",
    res,
    success: true,
    data: {
      followers: Followers.rows,
      followings: Followings.rows,
    },
  });
};

const followscheck = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user;

  console.log(id, user_id);

  if (!id) {
    return sendResponse({
      code: 400,
      message: "Invalid ID",
      res,
      success: false,
      data: null,
    });
  }

  const follow = await pool.query(checkfollowscript, [user_id, id]);

  return sendResponse({
    code: 200,
    message: "Follow check success",
    res,
    success: true,
    data: follow.rows,
  });
};

export { addfollow, removefollow, follows, followscheck };

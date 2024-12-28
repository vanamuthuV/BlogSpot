import { sendResponse } from "../utils/responder.js";
import { pool } from "../db/db.js";
import {
  addfavoritescript,
  removefavoritescript,
  checkfavoritescript,
} from "../db/query.js";

const addfavorites = async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;

  if (!id) {
    return sendResponse({
      code: 400,
      message: "Failed to favorite, please try again",
      res,
      success: false,
      data: null,
    });
  }

  const favorite = await pool.query(addfavoritescript, [user_id, id]);

  return sendResponse({
    code: 200,
    message: "Favorite added",
    res,
    success: true,
    data: favorite.rows[0],
  });
};

const removefavorite = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse({
      code: 400,
      message: "Failed to unfavorite, please try again",
      res,
      success: false,
      data: null,
    });
  }

  await pool.query(removefavoritescript, [id]);

  return sendResponse({
    code: 200,
    message: "Favorite removed",
    res,
    success: true,
    data: null,
  });
};

const getfavorite = async (req, res) => {
  const { id, user_id } = req?.params;
  const dummyID = "123e4567-e89b-12d3-a456-426614174000";

  let uid = user_id ? user_id : dummyID;

  const favorite = await pool.query(checkfavoritescript, [uid, id]);

  return sendResponse({
    code: 200,
    message: "Favorite fetch success",
    res,
    success: true,
    data: favorite.rows[0],
  });
};


export { addfavorites,getfavorite, removefavorite}
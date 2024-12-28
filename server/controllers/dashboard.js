import { sendResponse } from "../utils/responder.js";
import {
  getbookmarkscript,
  getdislikescript,
  getfavoritescript,
  getlikescript,
} from "../db/query.js";
import { pool } from "../db/db.js";

const getdashboard = async (req, res) => {
  const { user_id } = req.user;

  const [favorites, bookmark, likes, dislikes] = await Promise.all([
    pool.query(getfavoritescript, [user_id]),
    pool.query(getbookmarkscript, [user_id]),
    pool.query(getlikescript, [user_id]),
    pool.query(getdislikescript, [user_id]),
  ]);

  return sendResponse({
    code: 200,
    message: "Dashboard fetch success",
    res,
    success: true,
    data: {
      bookmark: bookmark.rows,
      favorites: favorites.rows,
      likes: likes.rows,
      dislikes: dislikes.rows,
    },
  });
};

export { getdashboard };

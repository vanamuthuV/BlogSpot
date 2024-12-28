import { pool } from "../db/db.js";
import { addbookmarkscript, removebookmarkscript } from "../db/query.js";
import { sendResponse } from "../utils/responder.js";

const AddBookMark = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user;

  if (!id || !user_id) {
    return sendResponse({
      code: 400,
      message: "Cannot find the post or user",
      res,
      success: false,
      data: null,
    });
  }

  const bookmark = await pool.query(addbookmarkscript, [user_id, id]);

  console.log(bookmark.rows);

  const { bookmarkid } = bookmark.rows[0];

  return sendResponse({
    code: 200,
    message: "Bookmarked",
    res,
    success: true,
    data: bookmarkid,
  });
};

const RemoveBookMark = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse({
      code: 400,
      message: "Invalid Bookmark ID",
      res,
      success: false,
      data: null,
    });
  }

  console.log(id)

  const bookmark = await pool.query(removebookmarkscript, [id]);

  return sendResponse({
    code: 200,
    message: "Bookmark removed",
    res,
    success: true,
    data: bookmark,
  });
};

export { AddBookMark, RemoveBookMark };

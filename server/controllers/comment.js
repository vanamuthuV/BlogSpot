import { sendResponse } from "../utils/responder.js";
import { pool } from "../db/db.js";
import {
  addcommentscript,
  getcommentscript,
  removecommentscript,
  updatecommentscript,
} from "../db/query.js";

const addcomment = async (req, res) => {
  const { comment } = req.body;
  const { user_id } = req.user;
  const { id } = req.params;

  if (!comment || !id) {
    return sendResponse({
      code: 400,
      message: "Comment failed",
      res,
      success: false,
      data: null,
    });
  }

  const comments = await pool.query(addcommentscript, [user_id, id, comment]);

  return sendResponse({
    code: 200,
    message: "Comment added",
    res,
    success: true,
    data: comments.rows[0],
  });
};

const getcomment = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse({
      code: 400,
      message: "Invalid ID",
      res,
      success: false,
      data: null,
    });
  }

  const comments = await pool.query(getcommentscript, [id]);
  return sendResponse({
    code: 200,
    message: "Comments fetch success",
    res,
    success: true,
    data: comments.rows,
  });
};

const removecomment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return sendResponse({
      code: 400,
      message: "Invalid ID",
      res,
      success: false,
      data: null,
    });
  }
  await pool.query(removecommentscript, [id]);

  return sendResponse({
    code: 200,
    message: "Comment removed",
    res,
    success: true,
    data: null,
  });
};

const updatecomment = async (req, res) => {
  const { newComment } = req.body;
  const { id } = req.params;

  if (!id) {
    return sendResponse({
      code: 400,
      message: "Invalid ID",
      res,
      success: false,
      data: null,
    });
  }

  const comment = await pool.query(updatecommentscript, [newComment, id]);

  return sendResponse({
    code: 200,
    message: "Comment updated",
    res,
    success: true,
    data: comment.rows[0],
  });
};

export { addcomment, getcomment, removecomment, updatecomment };

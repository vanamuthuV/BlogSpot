import { sendResponse } from "../utils/responder.js";
import { pool } from "../db/db.js";
import {
  getlikebyidscript,
  insertlikescript,
  deletelikescript,
  insertdislikescript,
} from "../db/query.js";

const getlikes = async (req, res) => {
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

  const likes = await pool.query(getlikebyidscript, [id]);

  return sendResponse({
    code: 200,
    message: "likes fetch success",
    res,
    success: true,
    data: likes.rows,
  });
};

const addlike = async (req, res) => {
  const { user_id } = req.user;
    const { post_id, like_id, is_update } = req.body;
    console.log("req boddy", req.body)

  if (!post_id) {
    return sendResponse({
      code: 400,
      message: "Invalid post id",
      res,
      success: false,
      data: null,
    });
  }

  if (like_id) {
    await pool.query(deletelikescript, [like_id]);
    if (is_update) {
      const like = await pool.query(insertlikescript, [user_id, post_id]);
      return sendResponse({
        code: 200,
        message: "Like added, Dislike removed",
        res,
        success: true,
        data: like.rows,
      });
    }
    return sendResponse({
      code: 200,
      message: "Like removed",
      res,
      success: true,
      data: null,
    });
  } else {
    const likes = await pool.query(insertlikescript, [user_id, post_id]);
    return sendResponse({
      code: 200,
      message: "Like added",
      res,
      success: true,
      data: likes.rows,
    });
  }
};

const adddislike = async (req, res) => {
  const { user_id } = req.user;
    const { post_id, like_id, is_update } = req.body;
    console.log(is_update)

  if (!post_id) {
    return sendResponse({
      code: 400,
      message: "Invalid post id",
      res,
      success: false,
      data: null,
    });
  }

  if (like_id) {
    await pool.query(deletelikescript, [like_id]);
    if (is_update === true) {
      const dislike = await pool.query(insertdislikescript, [user_id, post_id]);
      return sendResponse({
        code: 200,
        message: "Dislike added, like removed",
        res,
        success: true,
        data: dislike.rows,
      });
    }
    return sendResponse({
      code: 200,
      message: "Dislike removed",
      res,
      success: true,
      data: null,
    });
  } else {
    const dislikes = await pool.query(insertdislikescript, [user_id, post_id]);
    return sendResponse({
      code: 200,
      message: "Dislike added",
      res,
      success: true,
      data: dislikes.rows,
    });
  }
};

export { getlikes, adddislike, addlike };

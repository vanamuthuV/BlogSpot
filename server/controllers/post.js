import { pool } from "../db/db.js";
import { sendResponse } from "../utils/responder.js";
import {
  landingpagescript,
  createpostscript,
  postdetailwithoutuserscript,
  postdetailwithuserscript,
  deletepostscript,
  getpostdetailscript,
  updatepostscript,
  postimagescript,
} from "../db/query.js";

const landingpagepost = async (req, res) => {
  const posts = await pool.query(landingpagescript);

  return sendResponse({
    code: 200,
    message: "Blogs fetch success",
    res,
    success: true,
    data: posts.rows,
  });
};

const createpost = async (req, res) => {
  const { title, content, category, tags, summary, posttype, comments, media } =
    req.body;

  if (!title || !content || !category || !media) {
    return sendResponse({
      code: 400,
      message: "Fields are empty",
      res,
      success: false,
      data: null,
    });
  }

  const response = await pool.query(createpostscript, [
    title,
    media,
    content,
    category,
    tags,
    summary,
    posttype,
    comments,
    req.user.user_id,
  ]);

  return sendResponse({
    code: 200,
    message: "Post created successfully",
    res,
    success: true,
    data: response.rows,
  });
};

const postdetails = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { user_id } = req?.body;

  if (!id) {
    return sendResponse({
      code: 400,
      message: "Post fetch unsuccess",
      res,
      success: false,
      data: null,
    });
  }

  if (user_id) {
    console.log("Now me");
    const post = await pool.query(postdetailwithuserscript, [user_id, id]);
    return sendResponse({
      code: 200,
      message: "Post fetch success",
      res,
      success: true,
      data: post.rows,
    });
  } else {
    console.log("I have been called");
    const post = await pool.query(postdetailwithoutuserscript, [id]);
    return sendResponse({
      code: 200,
      message: "Post fetch success",
      res,
      success: true,
      data: post.rows,
    });
  }
};

const postimages = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse({
      code: 404,
      message: "Cannot find ID",
      res,
      success: false,
      data: null,
    });
  }

  const images = await pool.query(postimagescript, [id]);
  return sendResponse({
    code: 200,
    message: "Image fetch success",
    res,
    success: true,
    data: images.rows[0],
  });
};

const deletepost = async (req, res) => {
  const { user_id } = req.user;
  const { id, uid } = req.params;

  if (user_id === uid) {
    await pool.query(deletepostscript, [id]);
    return sendResponse({
      code: 200,
      message: "Post deletion success",
      res,
      success: true,
      data: null,
    });
  } else {
    return sendResponse({
      code: 403,
      message: "Something went wrong",
      res,
      success: false,
      data: null,
    });
  }
};

const getpostdetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse({
      code: 400,
      message: "Post fetch unsuccess",
      res,
      success: false,
      data: null,
    });
  }

  const post = await pool.query(getpostdetailscript, [id]);

  return sendResponse({
    code: 200,
    message: "Post fetch success",
    res,
    success: true,
    data: post.rows,
  });
};

const updatepost = async (req, res) => {
  const { id } = req.params;
  const { title, content, media, category, tags, summary, posttype, comments } =
    req?.body;

  console.log(
    title,
    content,
    media,
    category,
    tags,
    summary,
    posttype,
    comments
  );

  if (!id) {
    return sendResponse({
      code: 400,
      message: "Post update failed",
      res,
      success: false,
      data: null,
    });
  }

  await pool.query(updatepostscript, [
    title,
    media,
    content,
    category,
    tags,
    summary,
    posttype,
    comments,
    id,
  ]);

  return sendResponse({
    code: 200,
    message: "Post update success",
    res,
    success: true,
    data: null,
  });
};

export {
  landingpagepost,
  createpost,
  postdetails,
  deletepost,
  getpostdetails,
  updatepost,
  postimages
};

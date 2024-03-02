import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post("/", Authentication, async (req, res) => {
  const {
    title,
    content,
    media,
    category,
    tags,
    summary,
    posttype,
    comments,
    post_ids,
  } = req?.body?.data;
  console.log(
    title,
    content,
    media,
    category,
    tags,
    summary,
    posttype,
    comments,
    post_ids
  );

  const query = `
    update posts set post_title = $1, post_images = $2, post_content = $3, post_category = $4, post_tags = $5, post_summary = $6, post_type = $7, post_comment_type = $8 where post_id = $9
    `;

  try {
    await pool.query(query, [
      title,
      media,
      content,
      category,
      tags,
      summary,
      posttype,
      comments,
      post_ids,
    ]);
    res.status(200).json({ data: "success" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ data: error });
  }
});

export default router;

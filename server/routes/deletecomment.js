import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.delete("/:id", async (req, res) => {
  console.log(req.params);

  const { id } = req.params;

  const IDArray = id.split("-.");
  console.log(IDArray);

  const CommentID = IDArray[0];
  const postID = IDArray[1];

  const query = `
        delete from comments where comment_id = $1
    `;

  const query1 = `
        select * from users 
        join comments on users.user_id = comments.user_id
        join profilepicture on users.user_id = profilepicture.user_id
        where comments.post_id = $1 ORDER BY comments.comment_time DESC
    `;

  try {
    await pool.query(query, [CommentID]);
    const comments = await pool.query(query1, [postID]);
    res.status(200).json({ data: comments.rows });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});

export default router;

import express from "express";
import pool from "../db.js";

const router = express.Router();

const query = `
   SELECT users.*, profilepicture.*, posts.*, profileinformation.*, CASE 
        WHEN bookmark.bookmarkid IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS is_bookmarked,
    bookmark.bookmarkid
from users
    join posts on users.user_id = posts.user_id
    left outer join profilepicture on profilepicture.user_id = users.user_id
    left outer join profileinformation on users.user_id = profileinformation.user_id
LEFT JOIN
    (SELECT
        post_id,
        bookmarkid
     FROM
        bookmark
     WHERE
        user_id = $1
    ) AS bookmark ON posts.post_id = bookmark.post_id
    where posts.post_id = $2
`;

const queryD = `SELECT * from users
    join posts on users.user_id = posts.user_id
    left outer join profilepicture on profilepicture.user_id = users.user_id
    left outer join profileinformation on users.user_id = profileinformation.user_id
    where posts.post_id = $1`;

router.post("/", async (req, res) => {
  const { id, user_id } = req?.body;
  console.log("Ya MAn", req?.body);
  try {
    if (user_id !== undefined && user_id !== 'undefined') {
      const post = await pool.query(query, [user_id, id]);
      console.log("No bRo", id);
      res.status(200).json({ post: post.rows[0] });
    } else {
      const post = await pool.query(queryD, [id]);
      console.log("No bRo", id);
      res.status(200).json({ post: post.rows[0] });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: error.message });
  }
});

export default router;

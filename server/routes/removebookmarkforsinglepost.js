import pool from "../db.js";
import express from "express";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

const query = `delete from bookmark where bookmarkid = $1`;

const query1 = `SELECT users.*, profilepicture.*, posts.*, profileinformation.*, CASE 
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
    where posts.post_id = $2`;

router.post("/", Authentication, async (req, res) => {
  const { bookmarkid, user_id, post_id} = req?.body;
  try {
    await pool.query(query, [bookmarkid]);
    const posts = await pool.query(query1, [user_id, post_id]);

    res.status(200).json({ posts: posts.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(502).json({ posts: error });
  }
});

export default router;

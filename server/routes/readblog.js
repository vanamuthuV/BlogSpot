import express from "express";
import pool from "../db.js";

const router = express.Router();

const querytrending = `SELECT
    posts.*,
    users.*,
    profilepicture.*,
    COALESCE(liked.likecount, 0) AS likes,
    COALESCE(disliked.dislikecount, 0) AS dislikes
FROM
    posts
LEFT JOIN
    profilepicture ON posts.user_id = profilepicture.user_id
JOIN
    users ON posts.user_id = users.user_id
LEFT JOIN
    (SELECT
        post_id,
        COUNT(*) AS likecount
     FROM
        likes
     WHERE
        likes.likes = 'true'
     GROUP BY
        post_id
    ) AS liked ON posts.post_id = liked.post_id
LEFT JOIN
    (SELECT
        post_id,
        COUNT(*) AS dislikecount
     FROM
        likes
     WHERE
        likes.dislikes = 'true'
     GROUP BY
        post_id
    ) AS disliked ON posts.post_id = disliked.post_id
WHERE
    post_type = 'public';
 `;

const querynew = `select posts.* , users.*, profilepicture.*, coalesce(liked.likescount, 0) as likecount, COALESCE(disliked.dislikecount, 0) AS dislikes 
from posts LEFT JOIN
    profilepicture ON posts.user_id = profilepicture.user_id join users on posts.user_id = users.user_id 
left join (select post_id, coalesce(count(*),0) as likescount from likes where likes.likes = 'true' group by post_id) as liked
on posts.post_id = liked.post_id LEFT JOIN
    (SELECT
        post_id,
        COUNT(*) AS dislikecount
     FROM
        likes
     WHERE
        likes.dislikes = 'true'
     GROUP BY
        post_id
    ) AS disliked ON posts.post_id = disliked.post_id where post_type='public'  order by post_upload_time desc`;

const queryforyou = `select posts.post_title, users.*, prof.* from posts join users on posts.user_id = users.user_id
join
(select * from profilepicture right join (select following_id from follow join users on follow.follower_id = '45de9e3f-046d-4c8a-a93a-ba847bfb2c2e'
group by following_id) as ids on ids.following_id = profilepicture.user_id ) as prof
 on posts.user_id = prof.user_id order by posts.post_upload_time desc`;

router.post("/", async (req, res) => {
  try {
    console.log(req?.body?.type);
    console.log(req.body);
    if (req?.body?.type === "trending") {
      const posts = await pool.query(querytrending);
      res.status(200).json({ posts: posts.rows });
    }

    if (req?.body?.type === "new") {
      const posts = await pool.query(querynew);
      res.status(200).json({ posts: posts.rows });
    }

    if (req?.body?.type === "network") {
      const posts = await pool.query(queryforyou, [req?.body?.id]);
      console.log(posts.rowCount);
      res.status(200).json({ posts: posts.rows });
    }

    if (req?.body?.type === "foryou") {
      // const posts = await pool.query(queryforyou, [req?.body?.id]);
      // console.log(posts.rowCount);
      res.status(200).json({ posts: [] });
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

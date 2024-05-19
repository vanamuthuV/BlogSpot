import express from "express";
import pool from "../db.js";

const router = express.Router();

const querytrending = `select posts.*, users.*, coalesce(liked.likecount, 0) as likecounts from posts join users on posts.user_id  = users.user_id left join (select post_id, count(*) as likecount from likes group by post_id order by likecount desc) as liked on posts.post_id = liked.post_id where post_type='public' `;

const querynew = `select posts.* , users.* , coalesce(liked.likescount, 0) as likecount from posts join users on posts.user_id = users.user_id 
left join (select post_id, coalesce(count(*),0) as likescount from likes group by post_id) as liked
on posts.post_id = liked.post_id where post_type='public'  order by post_upload_time desc`;

const queryforyou = `select posts.*, users.* from posts join users on posts.user_id = users.user_id join (select following_id from follow join users on follow.follower_id = $1 group by following_id) as ids on posts.user_id = ids.following_id order by posts.post_upload_time desc`;

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

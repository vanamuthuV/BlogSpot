import pool from "../db.js";
import express from "express";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

const query = `insert into bookmark values ($1, $2, CURRENT_TIMESTAMP)`;

const querytrending = `SELECT
    posts.*,
    users.*,
    profilepicture.*,
    COALESCE(liked.likecount, 0) AS likecount,
    COALESCE(disliked.dislikecount, 0) AS dislikecount,
    CASE 
        WHEN bookmark.bookmarkid IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS is_bookmarked,
    bookmark.bookmarkid
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
LEFT JOIN
    (SELECT
        post_id,
        bookmarkid
     FROM
        bookmark
     WHERE
        user_id = $1
    ) AS bookmark ON posts.post_id = bookmark.post_id
WHERE
    post_type = 'public'
order by likecount desc`;

const querynew = `
    select posts.* , users.*, profilepicture.*, coalesce(liked.likescount, 0) as likecount, COALESCE(disliked.dislikecount, 0) AS dislikecount,
CASE 
        WHEN bookmark.bookmarkid IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS is_bookmarked,
    bookmark.bookmarkid
from posts LEFT JOIN
    profilepicture ON posts.user_id = profilepicture.user_id 
join users on posts.user_id = users.user_id 
left join 
(select post_id, coalesce(count(*),0) as likescount from likes where likes.likes = 'true' group by post_id) as liked
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
    ) AS disliked ON posts.post_id = disliked.post_id 
LEFT JOIN
    (SELECT
        post_id,
        bookmarkid
     FROM
        bookmark
     WHERE
        user_id = $1
    ) AS bookmark ON posts.post_id = bookmark.post_id
where post_type='public'  order by post_upload_time desc
`;

const querynetwork = `
    select A.*, 
coalesce(likedd.lik, 0) as likecount, 
coalesce(dislikedd.dislik, 0) as dislikecount,
 CASE 
        WHEN bookmark.bookmarkid IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS is_bookmarked,
    bookmark.bookmarkid
from 
(select posts.*, users.*, prof.* from posts join users on posts.user_id = users.user_id join
 (select
    follow.following_id,
    profilepicture.profileimage from follow join users on follow.follower_id = $1
    left join profilepicture on following_id =
profilepicture.user_id
	group by following_id, profilepicture.profileimage) as prof
 		on posts.user_id = prof.following_id) as A 
left join (select post_id, count(*) as lik from likes 
where likes = 'true' 
group by 
likes.post_id) as likedd on A.post_id = likedd.post_id left join
(select post_id, count(*) as dislik from likes where dislikes = 'true' group by likes.post_id) 
as dislikedd on A.post_id = dislikedd.post_id 
LEFT JOIN
    (SELECT
        post_id,
        bookmarkid
     FROM
        bookmark
     WHERE
        user_id = $1
    ) AS bookmark ON A.post_id = bookmark.post_id
where A.post_type = 'public' order by A.post_upload_time desc
`;

router.post("/", Authentication, async (req, res) => {
  console.log('reqq',req.body);
  const { user_id, post_id, type } = req?.body;
  try {
    await pool.query(query, [user_id, post_id]);
    if (type === "trending") {
      const posts = await pool.query(querytrending, [user_id]);
      res.status(200).json({ posts: posts.rows });
    }

    if (type === "new") {
      const posts = await pool.query(querynew, [user_id]);
      res.status(200).json({ posts: posts.rows });
    }

    if (type === "network") {
      const posts = await pool.query(querynetwork, [user_id]);
      console.log(posts.rowCount);
      res.status(200).json({ posts: posts.rows });
    }

    if (type === "foryou") {
      // const posts = await pool.query(queryforyou, [user_id]);
      // console.log(posts.rowCount);
      res.status(200).json({ posts: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ data: error });
  }
});

export default router;

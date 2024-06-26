import express from "express";
import pool from "../db.js";

const router = express.Router();

// const querytrending = `SELECT
//     posts.*,
//     users.*,
//     profilepicture.*,
//     COALESCE(liked.likecount, 0) AS likecount,
//     COALESCE(disliked.dislikecount, 0) AS dislikecount
// FROM
//     posts
// LEFT JOIN
//     profilepicture ON posts.user_id = profilepicture.user_id
// JOIN
//     users ON posts.user_id = users.user_id
// LEFT JOIN
//     (SELECT
//         post_id,
//         COUNT(*) AS likecount
//      FROM
//         likes
//      WHERE
//         likes.likes = 'true'
//      GROUP BY
//         post_id
//     ) AS liked ON posts.post_id = liked.post_id
// LEFT JOIN
//     (SELECT
//         post_id,
//         COUNT(*) AS dislikecount
//      FROM
//         likes
//      WHERE
//         likes.dislikes = 'true'
//      GROUP BY
//         post_id
//     ) AS disliked ON posts.post_id = disliked.post_id
// WHERE
//     post_type = 'public';
//  `;

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
order by likecount desc
`;

// const querynew = `select posts.* , users.*, profilepicture.*, coalesce(liked.likescount, 0) as likecount, COALESCE(disliked.dislikecount, 0) AS dislikecount
// from posts LEFT JOIN
//     profilepicture ON posts.user_id = profilepicture.user_id join users on posts.user_id = users.user_id
// left join (select post_id, coalesce(count(*),0) as likescount from likes where likes.likes = 'true' group by post_id) as liked
// on posts.post_id = liked.post_id LEFT JOIN
//     (SELECT
//         post_id,
//         COUNT(*) AS dislikecount
//      FROM
//         likes
//      WHERE
//         likes.dislikes = 'true'
//      GROUP BY
//         post_id
//     ) AS disliked ON posts.post_id = disliked.post_id where post_type='public'  order by post_upload_time desc`;

const querynew = `select posts.* , users.*, profilepicture.*, coalesce(liked.likescount, 0) as likecount, COALESCE(disliked.dislikecount, 0) AS dislikecount,
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
where post_type='public'  order by post_upload_time desc`;

const querynetwork = `select A.*, 
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
where A.post_type = 'public' order by A.post_upload_time desc `;

router.post("/", async (req, res) => {
  try {
    const dummyID = "123e4567-e89b-12d3-a456-426614174000";
    console.log(req?.body?.type);
    console.log(req.body?.id);
    if (req?.body?.id !== 'undefined') {
      if (req?.body?.type === "trending") {
        const posts = await pool.query(querytrending, [req?.body?.id]);
        res.status(200).json({ posts: posts.rows });
      }

      if (req?.body?.type === "new") {
        const posts = await pool.query(querynew, [req?.body?.id]);
        res.status(200).json({ posts: posts.rows });
      }

      if (req?.body?.type === "network") {
        const posts = await pool.query(querynetwork, [req?.body?.id]);
        console.log(posts.rowCount);
        res.status(200).json({ posts: posts.rows });
      }

      if (req?.body?.type === "foryou") {
        // const posts = await pool.query(queryforyou, [req?.body?.id]);
        // console.log(posts.rowCount);
        res.status(200).json({ posts: [] });
      }
    } else {
      if (req?.body?.type === "trending") {
        const posts = await pool.query(querytrending, [dummyID]);
        res.status(200).json({ posts: posts.rows });
      }

      if (req?.body?.type === "new") {
        const posts = await pool.query(querynew, [dummyID]);
        res.status(200).json({ posts: posts.rows });
      }

      if (req?.body?.type === "network") {
        const posts = await pool.query(querynetwork, [dummyID]);
        console.log(posts.rowCount);
        res.status(200).json({ posts: posts.rows });
      }

      if (req?.body?.type === "foryou") {
        // const posts = await pool.query(queryforyou, [req?.body?.id]);
        // console.log(posts.rowCount);
        res.status(200).json({ posts: [] });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

export default router;

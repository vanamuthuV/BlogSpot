import pool from "../db.js";
import express from 'express'

const router = express.Router()

const query = `insert into bookmark values ($1, $2)`
const query1 = `SELECT
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
    post_type = 'public';

`;

router.post('/', async (req, res) => {
    console.log(req.body);
    const {user_id, post_id} = req?.body
    try {
        await pool.query(query, [user_id, post_id])
        const Posts = await pool.query(query1, [user_id]);
        res.status(200).json({ posts: Posts.rows });
    } catch (error) {
        console.log(error);
        res.status(501).json({ data: error });
    }
    
})

export default router
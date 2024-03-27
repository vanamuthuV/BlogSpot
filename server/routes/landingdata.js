import express from "express";
import pool from "../db.js";

const router = express.Router();

// SELECT
//     posts.*,
//     users.*,
// 	profilepicture.*,
//     profileinformation.*,
//     COUNT(likes.likes) AS likes_count,
//     COUNT(dislikes.dislikes) AS dislikes_count,
// 	case when (users.user_id = follow.following_id and follow.follower_id = $1) then true else false end as FollowStatus
// FROM
//     posts
//     INNER JOIN users  ON posts.user_id = users.user_id
//     LEFT OUTER JOIN profileinformation ON posts.user_id = profileinformation.user_id
// 	LEFT OUTER JOIN profilepicture ON profilepicture.user_id = posts.user_id
//     LEFT OUTER JOIN likes ON posts.post_id = likes.post_id AND likes.likes = 'true'
//     LEFT OUTER JOIN likes AS dislikes ON posts.post_id = dislikes.post_id AND dislikes.dislikes = 'true'
// 	LEFT OUTER JOIN follow on posts.user_id = follow.following_id
// WHERE
//     posts.post_type = 'public' and (follow.follower_id = $1 or follow.follower_id is NULL)
// GROUP BY
//     posts.post_id, users.user_id, profilepicture.user_id, profilepicture.profileimage, profilepicture.profiletime, profilepicture.profileimageid, profileinformation.user_id, profileinformation.userfullname, profileinformation.role, profileinformation.dateofbirth, profileinformation.bio, profileinformation.profileupdatedate, profileinformation.profileinformationid, follow.following_id, follow.follower_id
// ORDER BY
//     likes_count DESC
// LIMIT 10;

const query = ` 
SELECT
    posts.*,
    users.*,
	profilepicture.*,
    profileinformation.*,
    COUNT(likes.likes) AS likes_count,
    COUNT(dislikes.dislikes) AS dislikes_count
FROM
    posts
    INNER JOIN users  ON posts.user_id = users.user_id
    LEFT OUTER JOIN profileinformation ON posts.user_id = profileinformation.user_id
	LEFT OUTER JOIN profilepicture ON profilepicture.user_id = posts.user_id
    LEFT OUTER JOIN likes ON posts.post_id = likes.post_id AND likes.likes = 'true'
    LEFT OUTER JOIN likes AS dislikes ON posts.post_id = dislikes.post_id AND dislikes.dislikes = 'true'
WHERE
    posts.post_type = 'public'
GROUP BY
    posts.post_id, users.user_id, profilepicture.user_id, profilepicture.profileimage, profilepicture.profiletime, profilepicture.profileimageid, profileinformation.user_id, profileinformation.userfullname, profileinformation.role, profileinformation.dateofbirth, profileinformation.bio, profileinformation.profileupdatedate, profileinformation.profileinformationid
ORDER BY
    likes_count DESC
LIMIT 6;
`;

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.user_id);
    console.log("CCCC");
    // const Posts = await pool.query(query, [req.body.user_id]);
    const Posts = await pool.query(query);
    res.status(200).json({ data: Posts.rows });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

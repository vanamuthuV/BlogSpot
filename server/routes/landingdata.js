import express from "express";
import pool from "../db.js";

const router = express.Router();

const query = `
    SELECT
    posts.*,
    users.*,
	profilepicture.*,
  profileinformation.*,
    COUNT(likes.post_id) AS likes_count
FROM
    posts 
    INNER JOIN users  ON posts.user_id = users.user_id
    LEFT OUTER JOIN profileinformation on posts.user_id = profileinformation.user_id
	LEFT OUTER JOIN profilepicture on profilepicture.user_id = posts.user_id
    LEFT OUTER JOIN likes ON posts.post_id = likes.post_id AND likes.likes = 'true'
    WHERE  posts.post_type = 'public'
GROUP BY
    posts.post_id, users.user_id, profilepicture.user_id, profilepicture.profileimage, profilepicture.profiletime, profilepicture.profileimageid, profileinformation.user_id, profileinformation.userfullname, profileinformation.role, profileinformation.dateofbirth, profileinformation.bio, profileinformation.profileupdatedate, profileinformation.profileinformationid

ORDER BY
    likes_count desc
LIMIT 10
`;

router.get("/", async (req, res) => {
  try {
    const Posts = await pool.query(query);
    res.status(200).json({ data: Posts.rows });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

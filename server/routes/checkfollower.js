import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

const query = `
    select * from posts where post_id = $1
`;

const query1 = `
    select * from follow where follower_id = $1 and following_id = $2
`

router.post("/",Authentication, async (req, res) => {
  const { follower_id, id } = req?.body;
  console.log(req?.body);
  console.log(follower_id);
  console.log(id);
  try {
    const Data = await pool.query(query, [id]);
    const following_id = Data?.rows[0]?.user_id;
      console.log(following_id);
    const FollowDetails = await pool.query(query1, [follower_id, following_id])
    res.status(200).json({ data: FollowDetails.rows });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error.message });
  }
});

export default router;

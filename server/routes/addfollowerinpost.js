import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

const query = `
    insert into follow values ($1, $2, current_timestamp)
`;

const query1 = `
    select * from follow where follower_id = $1 and following_id = $2
`;

router.post("/", Authentication, async (req, res) => {
  const { follower_id, following_id } = req?.body;
  console.log(req?.body);
  console.log(follower_id);
  try {
    await pool.query(query, [follower_id, following_id]);
    const FollowDetails = await pool.query(query1, [follower_id, following_id]);
    console.log(FollowDetails);
    res.status(200).json({ data: FollowDetails.rows });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error.message });
  }
});

export default router;

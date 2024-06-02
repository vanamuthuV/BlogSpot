import express from "express";
import Authentication from "../middleware/authorization.js";
import pool from "../db.js";
const router = express.Router();

router.post("/", Authentication, async (req, res) => {
  console.log(req.user);
  const { user_id } = req.user;
  const { accessToken } = req?.body?.data;
  const query = `
        select * from users left join profilepicture on users.user_id = profilepicture.user_id where users.user_id = $1
    `;

  const Profile = await pool.query(query, [user_id]);
  const obj = Object.assign({}, req.user, Profile.rows[0], {accessToken : accessToken});
  console.log(Profile.rows);
  console.log("Hoo");
  console.log(obj);
  res.status(200).json({ data: obj });
});

export default router;

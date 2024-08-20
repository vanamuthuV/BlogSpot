import express from "express";
import Authentication from "../middleware/authorization.js";
import pool from "../db.js";
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.user);
  try {
    const { user_id } = req.body;
    const { accessToken } = req?.user;
    const query = `
        select * from users left join profilepicture on users.user_id = profilepicture.user_id where users.user_id = $1
    `;

    const Profile = await pool.query(query, [user_id]);
    const obj = Object.assign({}, req.user, Profile.rows[0], {
      accessToken: accessToken,
    });
    console.log(Profile.rows);
    console.log("Hoo");
    console.log(obj);
    res.status(200).json({ data: obj });
  } catch (error) {
    res.status(403).json({error : error})
  }
  
});

export default router;

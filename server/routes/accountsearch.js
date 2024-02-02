import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { user_name } = req?.body;

  if (user_name === "") return res.status(200).json({ data: [] });

   const query = `
  select * from users left outer join profilepicture on users.user_id = profilepicture.user_id left outer join
profileInformation on users.user_id = profileInformation.user_id where users.user_name like $1
    `;

  try {
    const Users = await pool.query(query, [`${user_name}%`]);

    res.status(200).json({ data: Users.rows });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

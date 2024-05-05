import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Acc");
  console.log(req.body);
  const { val } = req?.body;

  if (val === "") return res.status(200).json({ data: [] });

   const query = `
  select * from users left outer join profilepicture on users.user_id = profilepicture.user_id left outer join
profileInformation on users.user_id = profileInformation.user_id where UPPER(users.user_name) like UPPER($1)
    `;

  try {
    const Users = await pool.query(query, [`${val}%`]);

    res.status(200).json({ data: Users.rows });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

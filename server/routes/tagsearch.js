import expres from "express";
import pool from "../db.js";

const router = expres.Router();

router.post("/", async (req, res) => {
  console.log("Tags");
  console.log(req.body);

  const { val } = req?.body;

  if (val === "") return res.status(200).json({ data: [] });

  const query = `
        select * from posts join users on posts.user_id = users.user_id where UPPER(post_tags) like UPPER($1) 
    `;

  try {
    const Posts = await pool.query(query, [`%${val}%`]);
    res.status(200).json({ data: Posts.rows });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

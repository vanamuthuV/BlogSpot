import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.delete("/:id", Authentication, async (req, res) => {
  const id = req?.params?.id;

  const query = `
        delete from posts where post_id = $1
    `;

  try {
    await pool.query(query, [id]);
    res.status(200).json({ data: "success" });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

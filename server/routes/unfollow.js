import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.delete("/:id",Authentication, async (req, res) => {
  console.log(req.params);
  const { id } = req?.params;
  console.log(id);

  const query = `
        delete from follow where follow_id = $1
    `;

  try {
    await pool.query(query, [id]);

    res.status(200).json({ data: [{}] });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

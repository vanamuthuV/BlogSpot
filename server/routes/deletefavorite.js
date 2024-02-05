import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.delete("/:id", Authentication, async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  console.log(id);

  const query = `
        delete from favorite where favorite_id = $1
    `;

  try {
    console.log(req.body);

    await pool.query(query, [id]);

    res.status(200).json({ data: {} });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});

export default router;

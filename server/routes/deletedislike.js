import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.delete("/:id", Authentication, async (req, res) => {
  try {
    const query = `
        delete from likes where like_id = $1
    `;

    const query3 = `
    select * from likes where post_id = $1 and likes = true
  `;

    const query4 = `
    select * from likes where post_id = $1 and dislikes = true
  `;

    const { id } = req.params;

    const Data = id.split("..");

    console.log(req.params);
    console.log(Data[0]);

    await pool.query(query, [Data[0]]);
    const TotalLike = await pool.query(query3, [Data[1]]);
    const TotalDisLike = await pool.query(query4, [Data[0]]);

    res.status(200).json({
      data: {
        TotalLike: TotalLike.rows,
        TotalDisLike: TotalDisLike.rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: error });
  }
});

export default router;

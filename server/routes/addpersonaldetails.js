import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post("/", Authentication, async (req, res) => {
  const { user_id, name, dof, bio, role } = req.body;

  const query = `
        insert into profileinformation values ($1, $2, $3, $4, $5, current_timestamp)
    `;

    const query1 = `
        select * from profileinformation where user_id = $1
    `;
  

  try {
      await pool.query(query, [user_id, name, role, dof, bio]);
      const Persona = await pool.query(query1, [user_id])
    res.status(200).json({ data: Persona.rows });
  } catch (error) {
      console.log(error);
    res.status(400).json({ data: error });
  }
});

router.put("/", Authentication, async (req, res) => {
  const { user_id, name, dof, bio, role } = req.body;

  const query = `
        update profileinformation set userfullname = $1, role = $2, dateofbirth = $3, bio = $4, profileupdatedate = current_timestamp where user_id = $5
    `;

  const query1 = `
        select * from profileinformation where user_id = $1
    `;

  try {
    await pool.query(query, [name, role,dof, bio, user_id]);
    const Persona = await pool.query(query1, [user_id]);
    res.status(200).json({ data: Persona.rows });
  } catch (error) {
    console.log(error);
    res.status(400).json({ data: error });
  }
});

export default router;

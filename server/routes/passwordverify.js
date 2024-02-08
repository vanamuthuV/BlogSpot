import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js"; 
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", Authentication, async (req, res) => {
    console.log(req.body);

    const { user_passcode, user_id } = req.body;

    const query = `
        select * from users where user_id = $1
    `
    try {

        const User = await pool.query(query, [user_id])

        if (User?.rows?.length === 0)
            return res.status(200).json({ data: "No Record Found!!" });

        const isValid = await bcrypt.compare(user_passcode, User?.rows[0].user_password)

        res.status(200).json({ data: isValid });
    } catch (error) {
        res.status(200).json({ data: error });
    }
    
})

export default router;
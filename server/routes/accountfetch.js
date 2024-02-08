import express from "express";
import pool from "../db.js";
import Authentication from "../middleware/authorization.js";

const router = express.Router();

router.post("/",Authentication, async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({data : "success"})
    } catch (error) {
        console.log(error);
        res.status(200).json({data : error})
    }
})

export default router;
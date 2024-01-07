import express from "express";
import Authentication from "../middleware/authorization.js";
const router = express.Router();

router.post('/',Authentication , async (req, res) => {
    console.log(req.user)
    res.send(req.user)
})

export default router;
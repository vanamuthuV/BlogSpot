import express from "express"
import Authentication from "../middleware/authorization.js";
import pool from "../db.js";
import multer from "multer";
import fs from "fs";

const UploadMiddleware = multer({ dest: "uploads/" });

const router = express.Router();

router.post('/', UploadMiddleware.single('media'), Authentication, async (req, res) => {
    console.log(req.body);
  console.log(req.file);
  if (req.file === undefined)
    res.status(200).json({ data: "No Data Found For Updation..." })
  else {
    try {
       const { originalname, path } = req.file;
       const parts = originalname.split(".");
       const extension = parts[parts.length - 1];
       const newPath = path + "." + extension;
       fs.renameSync(path, newPath);
       res.status(200).json({ data: newPath });
    } catch (error) {
      res.status(403).json({data : error})
    }
  }
 
})

export default router;
import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Authentication from "../../middleware/authorization.js";
import { getlikes, adddislike, addlike } from "../../controllers/likes.js";

const router = Router();

router.get("/likes/:id", asyncHandler(getlikes));
router.post("/likes", Authentication, asyncHandler(addlike));
router.post("/dislikes", Authentication, asyncHandler(adddislike));

export { router as LikeRoute };

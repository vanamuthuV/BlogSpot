import { Router } from "express";
import { AddBookMark, RemoveBookMark } from "../../controllers/bookmark.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Authentication from "../../middleware/authorization.js";

const router = Router();

router.post("/bookmark/:id", Authentication, asyncHandler(AddBookMark));
router.delete("/bookmark/:id", Authentication, asyncHandler(RemoveBookMark));

export { router as BookMarkRoute };

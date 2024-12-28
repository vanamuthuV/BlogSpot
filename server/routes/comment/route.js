import { asyncHandler } from "../../utils/asyncHandler.js";
import Authentication from "../../middleware/authorization.js";
import {
  addcomment,
  getcomment,
  removecomment,
  updatecomment,
} from "../../controllers/comment.js";

import { Router } from "express";

const router = Router();

router.get("/comment/:id", asyncHandler(getcomment));
router.post("/comment/:id", Authentication, asyncHandler(addcomment));
router.delete("/comment/:id", Authentication, asyncHandler(removecomment));
router.patch("/comment/:id", Authentication, asyncHandler(updatecomment));

export { router as CommentRoute };

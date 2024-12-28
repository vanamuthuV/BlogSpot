import Router from "express";
import {
  landingpagepost,
  createpost,
  postdetails,
  deletepost,
  getpostdetails,
  updatepost,
} from "../../controllers/post.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Authentication from "../../middleware/authorization.js";

const router = Router();

router.get("/landpost", asyncHandler(landingpagepost));
router.post("/post", Authentication, asyncHandler(createpost));
router.post("/post/:id", asyncHandler(postdetails));
router.delete("/post/:id/:uid", Authentication, asyncHandler(deletepost));
router.get("/post/:id", Authentication, asyncHandler(getpostdetails));
router.put("/post/:id", Authentication, asyncHandler(updatepost));

export { router as PostRoute };

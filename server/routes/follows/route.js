import { Router } from "express";
import Authentication from "../../middleware/authorization.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  addfollow,
  removefollow,
  follows,
  followscheck,
} from "../../controllers/follows.js";

const router = Router();

router.post("/follow/:id", Authentication, asyncHandler(addfollow));
router.delete("/follow/:id", Authentication, asyncHandler(removefollow));
router.get("/follow/check/:id", Authentication, asyncHandler(followscheck));
router.get("/follow/:user_name", asyncHandler(follows));

export { router as FollowRoute };

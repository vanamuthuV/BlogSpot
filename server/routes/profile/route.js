import { Router } from "express";
import Authentication from "../../middleware/authorization.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  updatepersonalinformation,
  addpersonalinformation,
  getprofile,
  addcoverimage,
  updatecoverimage,
  addprofileimage,
  updateprofileimage,
} from "../../controllers/profile.js";

const router = Router();

router.get("/profile/:user_name/:user_id", asyncHandler(getprofile));
router.post(
  "/profle/personal",
  Authentication,
  asyncHandler(addpersonalinformation)
);
router.put(
  "/profile/personal",
  Authentication,
  asyncHandler(updatepersonalinformation)
);

router.post("/profile/cover", Authentication, asyncHandler(addcoverimage));
router.put("/profile/cover", Authentication, asyncHandler(updatecoverimage));
router.post("/profile/profile", Authentication, asyncHandler(addprofileimage));
router.put(
  "/profile/profile",
  Authentication,
  asyncHandler(updateprofileimage)
);

export { router as ProfileRoute };

import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  checkusername,
  updateusername,
  checkuseremail,
  updateuseremail,
  emailverifyotpdispatch,
  verifyemail,
  verifyoldpassword,
  updatepasswordbyuserid,
  deleteaccount,
  updatepasswordbyuseremail
} from "../../controllers/account.js";
import Authentication from "../../middleware/authorization.js";

const router = Router();

router.get("/username/:value", asyncHandler(checkusername));
router.patch("/username", Authentication, asyncHandler(updateusername));
router.get("/email/:value", asyncHandler(checkuseremail));
router.patch("/email", asyncHandler(updateuseremail));
router.post("/emailotp", asyncHandler(emailverifyotpdispatch));
router.patch("/verify", asyncHandler(verifyemail));
router.post("/verify/oldpass", Authentication, asyncHandler(verifyoldpassword));
router.patch("/password", Authentication, asyncHandler(updatepasswordbyuserid));
router.delete("/account", Authentication, asyncHandler(deleteaccount));
router.patch("/password/email", asyncHandler(updatepasswordbyuseremail))

export { router as AccountRoute };

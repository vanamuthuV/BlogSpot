import { Router } from "express";
import {
  login,
  singup,
  usernamechecker,
  emailchecker,
  reloaduser,
} from "../../controllers/auth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Authentication from "../../middleware/authorization.js";

const router = Router();

router.post("/login", asyncHandler(login));
router.post("/signup", asyncHandler(singup));
router.post("/uncheck", asyncHandler(usernamechecker));
router.post("/uecheck", asyncHandler(emailchecker));
router.get("/reloaduser", Authentication, asyncHandler(reloaduser));

export { router as AuthRoute };

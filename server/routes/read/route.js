import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { read, readnolock } from "../../controllers/read.js";
import Authentication from "../../middleware/authorization.js";

const router = Router();

router.get("/read/s", Authentication, asyncHandler(read));

router.get("/read", asyncHandler(readnolock));

export { router as ReadRouter };

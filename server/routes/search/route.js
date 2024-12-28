import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getsearch } from "../../controllers/search.js";

const router = Router();

router.get("/search/:value", asyncHandler(getsearch));

export { router as SearchRoute };

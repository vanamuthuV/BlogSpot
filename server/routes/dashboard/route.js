import { Router } from "express";
import Authentication from "../../middleware/authorization.js";
import { getdashboard } from "../../controllers/dashboard.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/dashboard", Authentication, asyncHandler(getdashboard));

export { router as DashboardRoute };

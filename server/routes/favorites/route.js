import { asyncHandler } from "../../utils/asyncHandler.js";
import Authentication from "../../middleware/authorization.js";
import { Router } from "express";
import {
  addfavorites,
  getfavorite,
  removefavorite,
} from "../../controllers/favorites.js";

const router = Router();

router.get("/favorite/:id/:user_id", asyncHandler(getfavorite));
router.post("/favorite/:id", Authentication, asyncHandler(addfavorites));
router.delete("/favorite/:id", Authentication, asyncHandler(removefavorite));

export { router as FavoriteRoute };

import { Router } from "express";
import { AuthRoute } from "./auth/route.js";
import { PostRoute } from "./posts/route.js";
import { BookMarkRoute } from "./bookmark/route.js";
import { ReadRouter } from "./read/route.js";
import { ProfileRoute } from "./profile/route.js";
import { FollowRoute } from "./follows/route.js";
import { DashboardRoute } from "./dashboard/route.js";
import { LikeRoute } from "./likes/route.js";
import { FavoriteRoute } from "./favorites/route.js";
import { CommentRoute } from "./comment/route.js";
import { AccountRoute } from "./account/route.js";
import { SearchRoute } from "./search/route.js";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/post", PostRoute);
router.use("/bookmark", BookMarkRoute);
router.use("/read", ReadRouter);
router.use("/profile", ProfileRoute);
router.use("/follow", FollowRoute);
router.use("/dashboard", DashboardRoute);
router.use("/likes", LikeRoute);
router.use("/favorite", FavoriteRoute);
router.use("/comment", CommentRoute);
router.use("/account", AccountRoute);
router.use("/search", SearchRoute);

export default router;

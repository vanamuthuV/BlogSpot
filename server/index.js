import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUpRouter from "./routes/SignUp.js";
import loginRouter from "./routes/Login.js";
import postRouter from "./routes/post.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import reloadRouter from "./routes/reloaduser.js";
import ReadBlog from "./routes/readblog.js";
import path from "path";
import PostDetails from "./routes/postdetails.js";
import EditResource from "./routes/EditResource.js";
import ImageUpdater from "./routes/imageupdater.js";
import PostEditor from "./routes/EditPost.js";
import Comment from "./routes/comment.js";
import GetComments from "./routes/getcomments.js";
import SetCoverImage from "./routes/coverimage.js";
import SetProfileImage from "./routes/profileimage.js";
import GetProfileIamge from "./routes/getprofileimages.js";
import AddPersonalDetails from "./routes/addpersonaldetails.js";
import DeletePost from "./routes/deletepost.js";
import DeleteSinglepPost from "./routes/deletesinglepost.js";
import EditComment from "./routes/updatecomment.js";
import DeleteComment from "./routes/deletecomment.js";
import AccountSearch from "./routes/accountsearch.js";
import PostSearch from "./routes/postsearch.js";
import TagSearch from "./routes/tagsearch.js";
import CategorySearch from "./routes/categorysearch.js";
import Follow from "./routes/follow.js";
import Unfollow from "./routes/unfollow.js";
import GetFollowers from "./routes/getfollowers.js";
import GetFollowings from "./routes/getfollowings.js";
import RemoveUser from "./routes/removeuser.js";
import UnfollowUser from "./routes/unfollowuser.js";
import AddFavorite from "./routes/addfavorite.js";
import DeleteFavorite from "./routes/deletefavorite.js";
import GetFavorite from "./routes/getfavorite.js";
import Like from "./routes/like.js";
import GetLike from "./routes/getlike.js";
import DeleteLike from "./routes/deletelike.js";
import DeleteDislike from "./routes/deletedislike.js";
import Dislike from "./routes/dislike.js";
import Account from "./routes/accountfetch.js";
import UserNameCheck from "./routes/usernamecheck.js";
import UserNameUpdate from "./routes/usernameupdate.js";
import EmailCheck from "./routes/emailcheck.js";
import EmailUpdate from "./routes/emailupdate.js";
import PasswordVerify from "./routes/passwordverify.js";
import PasswordUpdate from "./routes/passwordupdate.js";
import DeleteAccount from "./routes/deleteaccount.js";
import GetDashBoard from "./routes/getdashboard.js";
import MoreFavorites from "./routes/loadfav.js";
import MoreLike from "./routes/loadlike.js";
import MoreDisLike from "./routes/loaddislike.js";
import LandingData from "./routes/landingdata.js";

const Base_URL = "http://localhost:5173";
dotenv.config();

const app = express();
const __dirname = path.resolve();
const corOptions = {
  Credential: true,
  origin: process.env.url || Base_URL,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/SignUp", signUpRouter);
app.use("/login", loginRouter);
app.use("/post", postRouter);
app.use("/reloaduser", reloadRouter);
app.use("/readblog", ReadBlog);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/coverimages", express.static(__dirname + "/coverimages"));
app.use("/profileimages", express.static(__dirname + "/profileimages"));
app.use("/postdetails", PostDetails);
app.use("/editresource", EditResource);
app.use("/imageupdate", ImageUpdater);
app.use("/edit", PostEditor);
app.use("/comment", Comment);
app.use("/getcomment", GetComments);
app.use("/setcoverimage", SetCoverImage);
app.use("/setprofileimage", SetProfileImage);
app.use("/getprofileimage", GetProfileIamge);
app.use("/addpersonaldetails", AddPersonalDetails);
app.use("/deletepost", DeletePost);
app.use("/deletesinglepost", DeleteSinglepPost);
app.use("/editcomment", EditComment);
app.use("/deletecomment", DeleteComment);
app.use("/accountsearch", AccountSearch);
app.use("/postsearch", PostSearch);
app.use("/tagsearch", TagSearch);
app.use("/categorysearch", CategorySearch);
app.use("/follow", Follow);
app.use("/unfollow", Unfollow);
app.use("/getfollowers", GetFollowers);
app.use("/getfollowings", GetFollowings);
app.use("/removeuser", RemoveUser);
app.use("/unfollowuser", UnfollowUser);
app.use("/addfavorite", AddFavorite);
app.use("/deletefavorite", DeleteFavorite);
app.use("/getfavorite", GetFavorite);
app.use("/like", Like);
app.use("/dislike", Dislike);
app.use("/getlikes", GetLike);
app.use("/deletelike", DeleteLike);
app.use("/deletedislike", DeleteDislike);
app.use("/account", Account);
app.use("/usernamecheck", UserNameCheck);
app.use("/usernameupdate", UserNameUpdate);
app.use("/emailcheck", EmailCheck);
app.use("/emailupdate", EmailUpdate);
app.use("/passcodeverify", PasswordVerify);
app.use("/passwordupdate", PasswordUpdate);
app.use("/deleteaccount", DeleteAccount);
app.use("/getdashboard", GetDashBoard);
app.use("/favload", MoreFavorites);
app.use("/likeload", MoreLike);
app.use("/dislikeload", MoreDisLike);
app.use("/landingdata", LandingData);

app.listen(5000, () => {
  console.log("Connected to postgres...");
  console.log("server is listening...");
});

/*
 * You May Exprience a Error So Called SCRAM which is nothing but you didn't import the dotenv in the file where you are using the .env variables
 */

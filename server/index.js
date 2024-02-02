import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUpRouter from "./routes/SignUp.js";
import loginRouter from "./routes/Login.js";
import postRouter from "./routes/post.js"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import reloadRouter from "./routes/reloaduser.js"
import ReadBlog from "./routes/readblog.js"
import path from "path"
import PostDetails from "./routes/postdetails.js"
import EditResource from "./routes/EditResource.js"
import ImageUpdater from "./routes/imageupdater.js"
import PostEditor from "./routes/EditPost.js"
import Comment from "./routes/comment.js"
import GetComments from "./routes/getcomments.js"
import SetCoverImage from "./routes/coverimage.js"
import SetProfileImage from "./routes/profileimage.js"
import GetProfileIamge from "./routes/getprofileimages.js"
import AddPersonalDetails from "./routes/addpersonaldetails.js"
import DeletePost from "./routes/deletepost.js"
import DeleteSinglepPost from "./routes/deletesinglepost.js"
import EditComment from "./routes/updatecomment.js"
import DeleteComment from "./routes/deletecomment.js"
import AccountSearch from "./routes/accountsearch.js"
import PostSearch from "./routes/postsearch.js"
import TagSearch from "./routes/tagsearch.js"
import CategorySearch from "./routes/categorysearch.js"

const Base_URL = "http://localhost:5173"
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
app.use("/reloaduser", reloadRouter)
app.use("/readblog", ReadBlog)
app.use("/uploads", express.static(__dirname + '/uploads'))
app.use("/coverimages", express.static(__dirname + "/coverimages"));
app.use("/profileimages", express.static(__dirname + "/profileimages"));
app.use("/postdetails", PostDetails);
app.use("/editresource", EditResource)
app.use("/imageupdate", ImageUpdater);
app.use("/edit", PostEditor);
app.use("/comment", Comment);
app.use("/getcomment", GetComments)
app.use("/setcoverimage", SetCoverImage)
app.use("/setprofileimage", SetProfileImage)
app.use("/getprofileimage", GetProfileIamge);
app.use("/addpersonaldetails", AddPersonalDetails);
app.use("/deletepost", DeletePost);
app.use("/deletesinglepost", DeleteSinglepPost);
app.use("/editcomment", EditComment)
app.use("/deletecomment", DeleteComment);
app.use("/accountsearch", AccountSearch);
app.use("/postsearch", PostSearch);
app.use("/tagsearch", TagSearch);
app.use("/categorysearch", CategorySearch);

app.listen(5000, () => {
  console.log("Connected to postgres...")
  console.log("server is listening...");
});

/*
 * You May Exprience a Error So Called SCRAM which is nothing but you didn't import the dotenv in the file where you are using the .env variables
 */
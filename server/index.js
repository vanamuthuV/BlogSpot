process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
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
import session from "express-session";
import passport, { Passport } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
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
import UserCheck from "./routes/uncheck.js";
import UserECheck from "./routes/uecheck.js";
import CheckFollow from "./routes/checkfollower.js";
import AddFollowerInPost from "./routes/addfollowerinpost.js";
import AddBookMark from "./routes/addbookmark.js";
import RemoveBookMark from "./routes/removebookmark.js";
import AddBookMarkSingle from "./routes/addbookmarksinglepost.js";
import RemoveBookMarkSingle from "./routes/removebookmarkforsinglepost.js";
import pool from "./db.js";
import jwtToken from "./utils/jwtToken.js";
import EmailVerify from "./routes/emailverify.js";

const Base_URL = "https://inkwellify.vercel.app";
// const Base_URL = "http://localhost:5173";
dotenv.config();

const queryuserexists = `select * from users left join profilepicture on users.user_id = profilepicture.user_id where strategic_id = $1`;
const querynewuser = `insert into users values ($1, $2, CURRENT_TIMESTAMP, 'google_user', $3, 'google', true)`;

const app = express();
const __dirname = path.resolve();
const corsOptions = {
  origin: Base_URL, // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Origin", "Content-Type", "Authorization"], // Allowed headers
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    name: "connect.sid",
    secret: process.env.EXPRESS_SESSION_SECREST_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is only used over HTTPS
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      sameSite: "None", // Allows cross-site requests
      Partitioned: "Lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());



// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const users = await pool.query(queryuserexists, [profile.id]);
//         console.log(profile);
//         if (users.rows.length === 0) {
//           await pool.query(querynewuser, [
//             profile._json.given_name.toLowerCase() +
//               profile._json.family_name.toLowerCase(),
//             profile._json.email,
//             profile.id,
//           ]);
//         }

//         const user = await pool.query(queryuserexists, [profile.id]);
//         console.log("Heehee",user);
//         const { accessToken, refreshToken } = await jwtToken(user.rows[0]);
//         user.rows[0].accessToken = accessToken;
//         user.rows[0].refreshToken = refreshToken
//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      // Custom function to fetch user details
      const fetchUserDetails = async () => {
        try {
          const users = await pool.query(queryuserexists, [profile.id]);
          console.log(profile);
          if (users.rows.length === 0) {
            await pool.query(querynewuser, [
              profile._json.given_name.toLowerCase() +
                profile._json.family_name.toLowerCase(),
              profile._json.email,
              profile.id,
            ]);
          }

          const user = await pool.query(queryuserexists, [profile.id]);
          console.log("Heehee", user);
          const { accessToken, refreshToken } = await jwtToken(user.rows[0]);
          user.rows[0].accessToken = accessToken;
          console.log("The access Token", accessToken);
          user.rows[0].refreshToken = refreshToken;
          console.log("This the user", user);
          return user;
        } catch (error) {
          console.log(error.message);
        }
      };

      // Call fetchUserDetails and pass the result to done callback
      fetchUserDetails()
        .then((user) => done(null, user))
        .catch((error) => done(error, null));
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("YEYEY", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("We from Des", user);
  done(null, user);
});

app.use(
  session({
    name: "connect.sid",
    secret: process.env.EXPRESS_SESSION_SECREST_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is only used over HTTPS
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      sameSite: "None", // Allows cross-site requests
      Partitioned: "Lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "https://inkwellify.vercel.app/",
//     failureRedirect: "https://inkwellify.vercel.app/SignUp",
//   })
// );

const Fail = "https://inkwellify.vercel.app/SignUp";
const DummyFail = "http://localhost:5173/SignUp";
const Success = "https://inkwellify.vercel.app/";
const DummySuccess = "http://localhost:5173";

app.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect(Fail);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect(Success);
    });
  })(req, res, next);
});

app.get("/login/success", (req, res) => {
  console.log("Yoo", req?.user);
  if (req.user) {
    res.status(200).json({
      message: "Authentication Success",
      variant: "success",
      data: req?.user?.rows[0],
    });
  } else {
    res
      .status(200)
      .json({ message: "Authentication Failed", variant: "error", data: null });
  }
});

app.get("/logouts", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("https://inkwellify.vercel.app/SignUp");
  });
});

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
app.use("/uncheck", UserCheck);
app.use("/uecheck", UserECheck);
app.use("/checkfollow", CheckFollow);
app.use("/addfollowinpost", AddFollowerInPost);
app.use("/addbookmark", AddBookMark);
app.use("/removebookmark", RemoveBookMark);
app.use("/addbookmarksingle", AddBookMarkSingle);
app.use("/removebookmarksingle", RemoveBookMarkSingle);
app.use("/emailverify", EmailVerify);

app.get("/", async (req, res) => {
  res.send(`<h2>Hello Boy </h2>`);
});

app.listen(5000, () => {
  console.log("Connected to postgres...");
  console.log("server is listening on port 5000 ...");
});

/*
 * You May Exprience a Error So Called SCRAM which is nothing but you didn't import the dotenv in the file where you are using the .env variables
 */

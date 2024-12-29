process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import router from "./routes/index.js";
import { pool } from "./db/db.js";
import jwtToken from "./utils/jwtToken.js";
import Authentication from "./middleware/authorization.js";
import { sendResponse } from "./utils/responder.js";
import { errorHandler } from "./utils/errorHandler.js";
import { SitemapStream, streamToPromise } from "sitemap";
import { asyncHandler } from "./utils/asyncHandler.js";
import { getallpost } from "./db/query.js";
import NodeCache from "node-cache";

const Base_URL = "https://inkwellify.vercel.app";
// const Base_URL = "http://localhost:5173";
dotenv.config();

const queryuserexists = `select * from users left join profilepicture on users.user_id = profilepicture.user_id where user_email = $1`;
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
app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    name: "connect.sid",
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: "None",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
      (async () => {
        try {
          const users = await pool.query(queryuserexists, [
            profile._json.email,
          ]);
          console.log("This is new profile", profile);
          if (users.rows.length === 0) {
            await pool.query(querynewuser, [
              profile._json.given_name.toLowerCase() +
                (() => {
                  if (!profile._json?.family_name) {
                    return ""; // Return an empty string if family_name is undefined or null
                  }
                  return profile._json.family_name.toLowerCase();
                })(),
              profile._json.email,
              profile.id,
            ]);
          }

          const user = await pool.query(queryuserexists, [profile._json.email]);
          console.log("Heehee", user);
          done(null, user.rows[0]);
        } catch (error) {
          console.log(error.message);
          return done(error, null);
        }
      })();
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

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

const Success = "https://inkwellify.vercel.app";
// const Success = "http://localhost:5173";

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      const { accessToken } = await jwtToken({ user });

      // Redirect to your frontend with the token
      res.redirect(`${Success}/auth/google/callback?token=${accessToken}`);
    } catch (error) {
      console.error("Error in Google callback:", error.message);
      res.redirect(
        `${Success}/login?error=${encodeURIComponent(error.message)}`
      );
    }
  }
);

app.get("/login/success", Authentication, (req, res) => {
  res.status(200).json({
    message: "Login Success",
    variant: "success",
    data: req.user,
  });
});

app.get("/logouts", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("https://inkwellify.vercel.app/SignUp");
  });
});

const sitemapCache = new NodeCache({ stdTTL: 3600 });

const getAllPost = async () => {
  const posts = await pool.query(getallpost);
  return posts.rows;
};



app.get("/sitemap.xml", async (req, res) => {
  const cachedSitemap = sitemapCache.get("sitemap");

  if (cachedSitemap) {
    // If cached, send it as a response
    console.log("Serving cached sitemap");
    return res.header("Content-Type", "application/xml").send(cachedSitemap);
  }
  console.log("Generating new sitemap");
  const smStream = new SitemapStream({
    hostname: "https://inkwellify.vercel.app",
  });

    const staticRoutes = [
      "/",
      "/SignUp",
      "/SignUp/login",
      "/createpost",
      "/Account",
      "/Dashboard",
      "/PageNotFound",
    ];

    staticRoutes.forEach((route) =>
      smStream.write({ url: route, changefreq: "daily", priority: 0.8 })
    );

  const posts = await getAllPost();

  posts.forEach((post) => {
    const postUrl = `/Read/${post.post_title
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, "-")}/${post.post_id}`;
    smStream.write({ url: postUrl, changefreq: "daily", priority: 0.8 });
  });

  smStream.end();
  const sitemap = await streamToPromise(smStream);

  sitemapCache.set("sitemap", sitemap.toString());

  res.header("Content-Type", "application/xml").send(sitemap.toString());
});

app.use("/api", router);

app.get("/", async (req, res) => {
  res.send(`<h2>Hello Boy </h2>`);
});

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Connected to postgres...");
  console.log("server is listening on port 5000 ...");
});

/*
 * You May Exprience a Error So Called SCRAM which is nothing but you didn't import the dotenv in the file where you are using the .env variables
 */

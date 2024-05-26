import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import pool from "./db.js";

const router = express.Router();

dotenv.config();

const query = `select * from users where strategic_id = $1`;
const querynewuser = `insert into users values ($1, $2, CURRENT_TIMESTAMP, 'google_user', $3, 'google', true)`;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       try {
//         const Data = await pool.query(query, [profile.id]);
//         console.log(profile.id);
//         console.log(profile);
//         console.log(
//           profile._json.given_name.toLowerCase() +
//             profile._json.family_name.toLowerCase()
//         );
//         console.log("The Data Is : ", Data.rows.length);
//         console.log(profile._json.email);

//         if (Data.rows.length === 0) {
//           await pool.query(querynewuser, [
//             profile._json.given_name.toLowerCase() +
//               profile._json.family_name.toLowerCase(),
//             profile._json.email,
//             profile.id,
//           ]);
//         }
//         const user = await pool.query(query, [profile.id]);
//         console.log(user);
//         return done(null, user.rows);
//         return done(null, profile);
//       } catch (error) {
//         console.log(error);
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
    async function (accessToken, refreshToken, profile, done) {
      try {
        const Data = await pool.query(query, [profile.id]);
        console.log(profile.id);
        console.log(profile);
        console.log(
          profile._json.given_name.toLowerCase() +
            profile._json.family_name.toLowerCase()
        );
        console.log("The Data Is : ", Data.rows.length);
        console.log(profile._json.email);

        if (Data.rows.length === 0) {
          await pool.query(querynewuser, [
            profile._json.given_name.toLowerCase() +
              profile._json.family_name.toLowerCase(),
            profile._json.email,
            profile.id,
          ]);
        }
        const user = await pool.query(query, [profile.id]);
        console.log(user.rows);
        return done(null, user.rows[0]);
      } catch (error) {
        console.log(error);
        return done(error); // Return the error to Passport
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("Hey", user);
  done(null, user.strategic_id); // Serialize the user ID
});



passport.deserializeUser(async (strategic_id, done) => {
  try {
    console.log("Deserializing user with strategic_id:", strategic_id);
    const query = "SELECT * FROM users WHERE strategic_id = $1";
    const result = await pool.query(query, [strategic_id]);
    if (result.rows.length === 0) {
      console.log("User not found");
      return done(null, false);
    }
    const user = result.rows[0];
    console.log("Deserialized user:", user);
    done(null, user);
  } catch (error) {
    console.error("Deserialization Error:", error);
    done(error);
  }
});






export default passport;

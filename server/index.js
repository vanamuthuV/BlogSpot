import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUpRouter from "./routes/SignUp.js";
import loginRouter from "./routes/Login.js";
import Authentication from "./middleware/authorization.js";
import pool from "./db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
// const corOptions = { Credential: true, origin: process.env.url};
app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(express.json());
app.use(cookieParser());
app.use("/SignUp", signUpRouter);
app.use("/login", loginRouter);

app.post("/users", Authentication , async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    console.log(users.rows)
    res.status(200).json({users : users.rows})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/fetchuserdata", (req, res) => {
  console.log(req);
  console.log("hit");
  res.json({message : "Success"})
})

app.listen(5000, () => {
  console.log("server is listening...");
});

/*
 * You May Exprience a Error So Called SCRAM which is nothing but you didm't import the dotenv in the file where you are using the .env variables
 */

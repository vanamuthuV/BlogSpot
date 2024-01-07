import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signUpRouter from "./routes/SignUp.js";
import loginRouter from "./routes/Login.js";
import postRouter from "./routes/post.js"
import Authentication from "./middleware/authorization.js";
import pool from "./db.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import reloadRouter from "./routes/reloaduser.js"

const Base_URL = "http://localhost:5173"

dotenv.config();

const app = express();

const corOptions = { Credential: true, origin: process.env.url || Base_URL};

app.use(cors(corOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/SignUp", signUpRouter);
app.use("/login", loginRouter);
app.use("/post", postRouter);
app.use("/reloaduser", reloadRouter)

// app.post("/users", Authentication , async (req, res) => {
//   try {
//     const users = await pool.query("SELECT * FROM users");
//     console.log(users.rows)
//     res.status(200).json({users : users.rows})
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// app.get("/fetchuserdata", Authentication, (req, res) => {
//   console.log(req);
//   console.log("hit");
//   res.json({message : "Success"})
// })

app.listen(5000, () => {
  console.log("Connected to postgres...")
  console.log("server is listening...");
});

/*
 * You May Exprience a Error So Called SCRAM which is nothing but you didm't import the dotenv in the file where you are using the .env variables
 */
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const Authentication = (req, res, next) => {
  const authHeader =
    req?.body?.headers?.Authorization || req?.headers?.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  if (token == null) return res.status(403).json({ error: "Token Is Null" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    user.accessToken = req?.body?.accessToken
    req.user = user;
    next();
  });
};

export default Authentication;

import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/responder.js";

const Authentication = (req, res, next) => {


  // Retrieve the Authorization header
  const authHeader =
    req?.body?.headers?.Authorization || req?.headers?.authorization;

  // Extract the token if the header is present
  const token = authHeader && authHeader.split(" ")[1];


  // Check if the token is missing
  if (!token) {
    return sendResponse({
      code: 403,
      message: "Authentication failed: No access token provided.",
      res,
      success: false,
      data: null,
    });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
    if (error) {
      // Handle specific error cases for better messaging
      const errorMessage =
        error.name === "TokenExpiredError"
          ? "Session has ended: Token expired. Please log in again."
          : "Authentication failed: Invalid token.";

      return sendResponse({
        code: 403,
        message: errorMessage,
        res,
        success: false,
        data: null,
      });
    }

    // Attach the user and token to the request object for downstream use
    req.user = { ...user, accessToken: token };

    // Proceed to the next middleware or route handler
    next();
  });
};

export default Authentication;

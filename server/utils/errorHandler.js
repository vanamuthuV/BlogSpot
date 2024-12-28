// Global error-handling middleware
import { sendResponse } from "./responder.js";

const errorHandler = (err, req, res, next) => {
  // Ensure a response is sent to the client

  console.log("Yo bro i got exceuted");

  console.error("Error passed to errorHandler:", err);

  return sendResponse({
    code: 500,
    data: null,
    message: "Something went wrong",
    res,
    success: false,
  });
};

export { errorHandler };

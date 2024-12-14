const sendResponse = ({ message, res, code, success, data: Null }) => {
  res.status(code).json({
    message,
    success,
    data,
  });
};

export { sendResponse };

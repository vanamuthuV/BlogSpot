const sendResponse = ({ message, res, code, success, data= { } }) => {
  res.status(code).json({
    message,
    success,
    data,
  });
};

export { sendResponse };

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log("The Error is ", err)
      next(err)
    });
  };
};

export {asyncHandler}
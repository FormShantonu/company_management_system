const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // Optional: Enhance error object
    error.statusCode = error.statusCode || 500;
    next(error);
  });
};

export default asyncHandler;

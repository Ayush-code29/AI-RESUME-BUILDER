
const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal server error.";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid value supplied.";
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "A record with this value already exists.";
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  } else if (statusCode >= 500) {
    console.error("Internal server error:", err.message);
    message = "Something went wrong on the server.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
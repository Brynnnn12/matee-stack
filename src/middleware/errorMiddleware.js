/**
 * Middleware untuk menangani error
 * Menangani berbagai jenis error seperti Sequelize, CSRF, dan session errors
 * Mengembalikan response JSON dengan status dan message yang sesuai
 */
exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Middleware untuk menangani error
 * Menangani berbagai jenis error seperti Sequelize, CSRF, dan session errors
 * Mengembalikan response JSON dengan status dan message yang sesuai
 * Jika dalam mode development, juga mengembalikan stack trace
 * Jika dalam mode production, hanya mengembalikan status dan message
 */
exports.errorHandler = (err, req, res, next) => {
  // Default status code dan message
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // Handle Sequelize validation errors
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  if (err.code === "EBADCSRFTOKEN") {
    statusCode = 403;
    message = "Invalid CSRF token";
  }

  if (err.name === "SessionError") {
    statusCode = 400;
    message = "Session error";
  }

  if (Array.isArray(err.errors) && err.errors[0]?.param) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.errors.map((e) => ({
      field: e.param,
      message: e.msg,
    }));
  }

  const response = {
    status: statusCode >= 500 ? "error" : "fail",
    message,
    ...(errors && { errors }), // Only include errors if exists
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

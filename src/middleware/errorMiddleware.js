/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

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

  // ...existing code...

  // Handle CSRF errors
  if (err.code === "EBADCSRFTOKEN") {
    statusCode = 403;
    message = "Invalid CSRF token";
  }

  // Handle express-session errors
  if (err.name === "SessionError") {
    statusCode = 400;
    message = "Session error";
  }

  // Handle express-validator errors
  if (Array.isArray(err.errors) && err.errors[0]?.param) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.errors.map((e) => ({
      field: e.param,
      message: e.msg,
    }));
  }

  // Response structure
  const response = {
    status: statusCode >= 500 ? "error" : "fail",
    message,
    ...(errors && { errors }), // Only include errors if exists
  };

  // Include stack trace in development only
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

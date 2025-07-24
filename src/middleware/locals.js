/**
 * Middleware untuk mengatur locals
 * Menyediakan csrfToken, message, error, success, errors, dan old values untuk semua view
 * Digunakan untuk memastikan data ini tersedia di setiap request
 * Dapat digunakan untuk mengatur data lain yang diperlukan di view
 */
exports.setLocals = (req, res, next) => {
  res.locals.csrfToken =
    typeof req.csrfToken === "function" ? req.csrfToken() : "";
  res.locals.message = req.flash("message");
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.errors = [];
  res.locals.old = {};
  next();
};

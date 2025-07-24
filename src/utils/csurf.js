const csurf = require("csurf");

/**
 * middleware untuk menangani CSRF token pada upload
 * menggunakan body-parser untuk mengurai body
 */
exports.csrfUpload = csurf({
  value: (req) => {
    if (req.body && req.body._csrf) return req.body._csrf;
    if (req.query && req.query._csrf) return req.query._csrf;
    if (req.headers["csrf-token"]) return req.headers["csrf-token"];
    return null;
  },
});

const csurf = require("csurf");

// Untuk route upload file (setelah multer)
exports.csrfUpload = csurf({
  value: (req) => {
    // Cek di body, query, atau header
    if (req.body && req.body._csrf) return req.body._csrf;
    if (req.query && req.query._csrf) return req.query._csrf;
    if (req.headers["csrf-token"]) return req.headers["csrf-token"];
    return null;
  },
});

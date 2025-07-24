const csurf = require("csurf");

/**
 * Middleware untuk pengecualian CSRF
 * Digunakan untuk mengecualikan beberapa route dari CSRF protection
 * Jika path yang diminta cocok dengan salah satu dari daftar pengecualian,
 * middleware ini akan melewati pengecekan CSRF.
 * Jika tidak, akan melanjutkan ke middleware CSRF.
 */
exports.csrfExclusion = (req, res, next) => {
  // List route yang ingin dikecualikan dari CSRF
  const exemptPaths = [
    "/dashboard/games",
    "/dashboard/avatar",
    "/dashboard/character",
  ];

  // Cek apakah path cocok dan method POST/PUT
  const isExempt =
    exemptPaths.some((path) => req.originalUrl.startsWith(path)) &&
    (req.method === "POST" || req.method === "PUT");

  if (isExempt) {
    // Jika path dikecualikan, lanjutkan tanpa CSRF
    return next();
  }

  // Jika tidak dikecualikan, gunakan middleware CSRF
  return csurf()(req, res, next);
};

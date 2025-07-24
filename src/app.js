require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require("helmet");
const morgan = require("morgan");
const methodOverride = require("method-override");
// const csurf = require("csurf");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const webRoutes = require("./routes/web");
const expressLayouts = require("express-ejs-layouts");
const { attachUser } = require("./middleware/authMiddleware");
const { csrfExclusion } = require("./middleware/csrfExclusion");
const { setLocals } = require("./middleware/locals");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(
  session({
    name: process.env.SESSION_NAME || "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

app.use(flash());

// Static middleware harus sebelum CSRF
app.use(express.static(path.resolve(__dirname, "../public")));
app.use("/src", express.static(path.resolve(__dirname, "src")));

// Middleware untuk CSRF
// Uncomment jika ingin menggunakan CSRF di semua route
// app.use(csurf());

// PASANG CSRF GLOBAL UNTUK SEMUA ROUTE KECUALI UPLOAD FILE (games, avatar, character)
app.use(csrfExclusion);
// Middleware global agar csrfToken & message tersedia di semua view
app.use(setLocals);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

// Middleware untuk attach user ke request dan locals
app.use(attachUser);
app.use("/", webRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

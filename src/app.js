require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require("helmet");
const morgan = require("morgan");
const methodOverride = require("method-override");
const csurf = require("csurf");
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const webRoutes = require("./routes/web");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

app.use(flash());

// Static middleware harus sebelum CSRF
app.use(express.static(path.resolve(__dirname, "../public")));
app.use("/src", express.static(path.resolve(__dirname, "src")));

// CSRF harus setelah session & flash
app.use(csurf());

// Middleware global agar csrfToken & message tersedia di semua view
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.message = req.flash("message");
  res.locals.errors = [];
  res.locals.old = {};
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use("/", webRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

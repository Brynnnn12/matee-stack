const express = require("express");
const router = express.Router();

// Import routers
const homeRouter = require("./home");
const authRouter = require("./auth");
const dashboardRouter = require("./dashboard");
const profileRouter = require("./dashboard/profile");
const rolesRouter = require("./dashboard/roles");
const genresRouter = require("./dashboard/genres");
const gamesRouter = require("./dashboard/games");
const charactersRouter = require("./dashboard/characters");
const skillRouter = require("./dashboard/skills");

// Use routers
router.use("/", homeRouter);
router.use("/", authRouter);
router.use("/dashboard", dashboardRouter);
router.use("/dashboard/profiles", profileRouter);
router.use("/dashboard/roles", rolesRouter);
router.use("/dashboard/genres", genresRouter);
router.use("/dashboard/games", gamesRouter);
router.use("/dashboard/characters", charactersRouter);
router.use("/dashboard/skills", skillRouter);

module.exports = router;

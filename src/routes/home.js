const express = require("express");
const router = express.Router();
const { Character, Game, Skill } = require("../models");

router.get("/", async (req, res) => {
  const user = req.user || null;
  const message = req.flash("message") || null;

  // Ambil data characters hanya 3 saja, dengan relasi game dan skills
  const characters = await Character.findAll({
    limit: 3,
    include: [
      {
        model: Game,
        as: "game",
        attributes: ["id", "name"],
      },
      {
        model: Skill,
        as: "skills",
        attributes: ["id", "name"],
      },
    ],
  });
  //hitung jumlah karakter
  const characterCount = await Character.count();
  //hitung jumlah game
  const gameCount = await Game.count();

  res.render("home", {
    title: "Home",
    characters,
    characterCount,
    gameCount,
    user,
    message,
    currentPage: "home",
  });
});

module.exports = router;

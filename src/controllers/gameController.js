const { Game, Genre } = require("../models");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { generateSlug } = require("../utils/slug");
const { validateImage, deleteImage } = require("../utils/imageValidate");
const path = require("path");
const IMAGE_PATH = path.join(__dirname, "../../public/uploads/games/");

exports.index = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const {
    docs: games,
    pages,
    total,
  } = await Game.paginate({
    page,
    paginate: limit,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Genre,
        as: "genre",
        attributes: ["name"],
      },
    ],
  });

  res.render("dashboard/games", {
    title: "Games",
    games,
    currentPage: "games",
    page,
    pages,
    total,
    limit,
    layout: "layouts/dashboard",
  });
});

exports.create = asyncHandler(async (req, res) => {
  const genres = await Genre.findAll({ order: [["createdAt", "DESC"]] });
  res.render("dashboard/games/create", {
    title: "Create Game",
    currentPage: "games",
    genres,
    layout: "layouts/dashboard",
    csrfToken: req.csrfToken(),
    errors: req.flash("errors"),
    old: req.flash("old")[0] || {},
  });
});

exports.store = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  const imageError = validateImage(req);
  if (imageError) {
    if (req.file && req.file.filename) {
      deleteImage(path.join(IMAGE_PATH, req.file.filename));
    }
    req.flash("errors", [{ path: "image", msg: imageError }]);
    req.flash("old", req.body);
    return res.redirect("/dashboard/games/create");
  }

  if (!errors.isEmpty()) {
    if (req.file && req.file.filename) {
      deleteImage(path.join(IMAGE_PATH, req.file.filename));
    }

    // console.log(errors.array());
    req.flash("errors", errors.array());
    req.flash("old", req.body);
    return res.redirect("/dashboard/games/create");
  }

  const { name, genre_id, description, release_date, developer } = req.body;
  const slug = generateSlug(name);
  const image = req.file ? req.file.filename : null;
  await Game.create({
    name,
    slug,
    description,
    image,
    genre_id,
    release_date: release_date || null,
    developer: developer || null,
  });
  req.flash("message", "Game berhasil dibuat");
  res.redirect("/dashboard/games");
});

exports.edit = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const game = await Game.findOne({ where: { slug } });
  if (!game) {
    req.flash("message", "Game tidak ditemukan");
    return res.redirect("/dashboard/games");
  }

  const genres = await Genre.findAll({ order: [["createdAt", "DESC"]] });
  res.render("dashboard/games/edit", {
    title: "Edit Game",
    game,
    genres,
    currentPage: "games",
    layout: "layouts/dashboard",
    errors: req.flash("errors"),
    old: req.flash("old")[0] || {},
    csrfToken: req.csrfToken(),
  });
});

exports.update = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const errors = validationResult(req);
  const game = await Game.findOne({ where: { slug } });

  if (!game) {
    req.flash("message", "Game tidak ditemukan");
    return res.redirect("/dashboard/games");
  }

  if (!errors.isEmpty()) {
    if (req.file && req.file.filename) {
      deleteImage(req.file.filename, IMAGE_PATH);
    }
    req.flash("errors", errors.array());
    req.flash("old", req.body);
    return res.redirect(`/dashboard/games/${slug}/edit`);
  }

  if (req.file) {
    const imageError = validateImage(req);
    if (imageError) {
      deleteImage(req.file.filename, IMAGE_PATH);
      req.flash("errors", [{ path: "image", msg: imageError }]);
      req.flash("old", req.body);
      return res.redirect(`/dashboard/games/${slug}/edit`);
    }

    if (game.image) {
      deleteImage(path.join(IMAGE_PATH, game.image));
    }
    game.image = req.file.filename;
  }

  const { name, genre_id, description, release_date, developer } = req.body;
  game.name = name;
  game.slug = generateSlug(name);
  game.genre_id = genre_id;
  game.description = description;
  game.release_date = release_date || null;
  game.developer = developer || null;
  await game.save();

  req.flash("message", "Game berhasil diperbarui");
  res.redirect("/dashboard/games");
});

exports.destroy = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const game = await Game.findOne({ where: { slug } });
  if (!game) {
    req.flash("message", "Game tidak ditemukan");
    return res.redirect("/dashboard/games");
  }

  if (game.image) {
    deleteImage(path.join(IMAGE_PATH, game.image));
  }
  await game.destroy();
  req.flash("message", "Game berhasil dihapus");
  res.redirect("/dashboard/games");
});

exports.show = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const game = await Game.findOne({ where: { slug } });
  if (!game) {
    req.flash("message", "Game tidak ditemukan");
    return res.redirect("/dashboard/games");
  }

  res.render("dashboard/games/show", {
    title: game.title,
    game,
    currentPage: "games",
    layout: "layouts/dashboard",
  });
});

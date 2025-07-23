const { Game, Character } = require("../models");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { generateSlug } = require("../utils/slug");
const { validateImage, deleteImage } = require("../utils/imageValidate");
const path = require("path");
const IMAGE_PATH = path.join(__dirname, "../../public/uploads/characters/");

exports.index = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const {
    docs: characters,
    pages,
    total,
  } = await Character.paginate({
    page,
    paginate: limit,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Game,
        as: "game",
        attributes: ["name"],
      },
    ],
  });

  res.render("dashboard/characters", {
    title: "Characters",
    characters,
    currentPage: "characters",
    page,
    pages,
    total,
    limit,
    layout: "layouts/dashboard",
  });
});

exports.create = asyncHandler(async (req, res) => {
  const games = await Game.findAll({ order: [["createdAt", "DESC"]] });
  res.render("dashboard/characters/create", {
    title: "Create Character",
    currentPage: "characters",
    games,
    layout: "layouts/dashboard",
    csrfToken: req.csrfToken(),
    errors: req.flash("errors"),
    old: req.flash("old")[0] || {},
  });
});

exports.store = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  // Validasi gambar
  const imageError = validateImage(req);
  if (imageError) {
    if (req.file && req.file.filename) {
      deleteImage(req.file.filename, IMAGE_PATH);
    }
    req.flash("message", imageError);
    return res.redirect("/dashboard/characters/create");
  }

  if (!errors.isEmpty()) {
    if (req.file && req.file.filename) {
      deleteImage(req.file.filename, IMAGE_PATH);
    }
    req.flash("errors", errors.array());
    req.flash("old", req.body);
    return res.redirect("/dashboard/characters/create");
  }

  const { name, description, game_id } = req.body;
  const slug = generateSlug(name);

  try {
    const character = await Character.create({
      name,
      slug,
      description,
      image: req.file ? req.file.filename : null,
      game_id,
    });

    req.flash("message", "Character created successfully");
    res.redirect("/dashboard/characters");
  } catch (error) {
    console.error(error);
    req.flash("message", "Failed to create character");
    res.redirect("/dashboard/characters/create");
  }
});

exports.edit = asyncHandler(async (req, res) => {
  const character = await Character.findOne({
    where: { slug: req.params.slug },
    include: [{ model: Game, as: "game" }],
  });

  if (!character) {
    req.flash("message", "Character not found");
    return res.redirect("/dashboard/characters");
  }

  const games = await Game.findAll({ order: [["createdAt", "DESC"]] });
  res.render("dashboard/characters/edit", {
    title: "Edit Character",
    character,
    games,
    currentPage: "characters",
    layout: "layouts/dashboard",
    csrfToken: req.csrfToken(),
    errors: req.flash("errors"),
    old: req.flash("old")[0] || {},
  });
});

exports.update = asyncHandler(async (req, res) => {
  const character = await Character.findOne({
    where: { slug: req.params.slug },
  });
  if (!character) {
    req.flash("message", "Character not found");
    return res.redirect("/dashboard/characters");
  }

  const errors = validationResult(req);

  // Validasi gambar
  const imageError = validateImage(req);
  if (imageError) {
    if (req.file && req.file.filename) {
      deleteImage(req.file.filename, IMAGE_PATH);
    }
    req.flash("message", imageError);
    return res.redirect(`/dashboard/characters/${character.slug}/edit`);
  }

  if (!errors.isEmpty()) {
    if (req.file && req.file.filename) {
      deleteImage(req.file.filename, IMAGE_PATH);
    }
    req.flash("errors", errors.array());
    req.flash("old", req.body);
    return res.redirect(`/dashboard/characters/${character.slug}/edit`);
  }

  const { name, description, game_id } = req.body;
  const slug = generateSlug(name);
  const image = req.file ? req.file.filename : character.image;

  try {
    await character.update({
      name,
      slug,
      description,
      image,
      game_id,
    });

    req.flash("message", "Character updated successfully");
    res.redirect("/dashboard/characters");
  } catch (error) {
    console.error(error);
    req.flash("message", "Failed to update character");
    res.redirect(`/dashboard/characters/${character.slug}/edit`);
  }
});

exports.destroy = asyncHandler(async (req, res) => {
  const character = await Character.findOne({
    where: { slug: req.params.slug },
  });
  if (!character) {
    req.flash("message", "Character not found");
    return res.redirect("/dashboard/characters");
  }

  try {
    // Hapus gambar jika ada
    if (character.image) {
      deleteImage(character.image, IMAGE_PATH);
    }

    await character.destroy();
    req.flash("message", "Character deleted successfully");
    res.redirect("/dashboard/characters");
  } catch (error) {
    console.error(error);
    req.flash("message", "Failed to delete character");
    res.redirect(`/dashboard/characters/${character.slug}`);
  }
});

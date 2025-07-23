const { validationResult } = require("express-validator");
const { Genre } = require("../models");
const asyncHandler = require("express-async-handler");
const { generateSlug } = require("../utils/slug");

exports.index = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const {
    docs: genres,
    pages,
    total,
  } = await Genre.paginate({
    page,
    paginate: limit,
    order: [["createdAt", "DESC"]],
  });
  res.render("dashboard/genres", {
    title: "Genres",
    genres,
    currentPage: "genres",
    page,
    pages,
    total,
    limit,
    layout: "layouts/dashboard",
  });
});

exports.create = (req, res) => {
  res.render("dashboard/genres/create", {
    title: "Create Genre",
    currentPage: "genres",
    layout: "layouts/dashboard",
    errors: req.flash("errors"),
    old: req.flash("old")[0] || {},
  });
};

exports.store = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    req.flash("old", req.body);
    return res.redirect("/dashboard/genres/create");
  }

  const { name } = req.body;
  const slug = generateSlug(name);
  const genre = await Genre.create({ name, slug });
  req.flash("message", "Genre berhasil dibuat");
  res.redirect("/dashboard/genres");
});

exports.edit = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const genre = await Genre.findOne({ where: { slug } });
  if (!genre) {
    req.flash("message", "Genre tidak ditemukan");
    return res.redirect("/dashboard/genres");
  }
  res.render("dashboard/genres/edit", {
    title: "Edit Genre",
    genre,
    currentPage: "genres",
    layout: "layouts/dashboard",
    errors: req.flash("errors"),
    old: req.flash("old")[0] || {},
  });
});

exports.update = asyncHandler(async (req, res) => {
  //slug params
  const { slug } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    req.flash("old", req.body);
    return res.redirect(`/dashboard/genres/${slug}/edit`);
  }

  const { name } = req.body;
  const newSlug = generateSlug(name);
  const genre = await Genre.update(
    { name, slug: newSlug },
    { where: { slug } }
  );
  req.flash("message", "Genre berhasil diupdate");
  res.redirect("/dashboard/genres");
});

exports.destroy = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const genre = await Genre.findOne({ where: { slug } });
  if (!genre) {
    req.flash("message", "Genre tidak ditemukan");
    return res.redirect("/dashboard/genres");
  }
  await Genre.destroy({ where: { slug } });
  req.flash("message", "Genre berhasil dihapus");
  res.redirect("/dashboard/genres");
});

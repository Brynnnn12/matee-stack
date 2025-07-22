document.getElementById("menu-toggle")?.addEventListener("click", function () {
  var menu = document.getElementById("menu");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    menu.classList.add("flex");
  } else {
    menu.classList.add("hidden");
    menu.classList.remove("flex");
  }
});
document.getElementById("home-btn")?.addEventListener("click", function () {
  document.getElementById("home-section")?.scrollIntoView({ behavior: "smooth" });
});
document.getElementById("about-btn")?.addEventListener("click", function () {
  document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
});
document.getElementById("contact-btn")?.addEventListener("click", function () {
  document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
});

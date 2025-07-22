document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menu.classList.toggle("hidden");
    menuToggle.setAttribute("aria-expanded", !isExpanded);
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    document.addEventListener("click", function (event) {
      const isClickInside =
        menu.contains(event.target) || menuToggle.contains(event.target);
      if (!isClickInside && !menu.classList.contains("hidden")) {
        toggleMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !menu.classList.contains("hidden")) {
        toggleMenu();
      }
    });
  }
});

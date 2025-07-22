document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("sidebar-collapsed");
    sidebar.classList.toggle("sidebar-expanded");
  });

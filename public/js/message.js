// Message alert auto-hide animation
window.addEventListener("DOMContentLoaded", function () {
  const messageAlert = document.querySelector(".animate-fade-in");
  if (messageAlert) {
    // Fade out after 2.5 seconds
    setTimeout(() => {
      messageAlert.style.transition = "opacity 0.7s";
      messageAlert.style.opacity = "0";
      setTimeout(() => {
        messageAlert.style.display = "none";
      }, 700);
    }, 2500);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("artistIntroModal");
  const closeBtn = document.getElementById("closeIntroModal");

  document.getElementById("artistIntroSummary").addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

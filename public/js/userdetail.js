document.addEventListener("DOMContentLoaded", () => {
  // --- MENU POPUP ---
  const moreBtn = document.querySelector(".container-box-component-userPage-btn-icon");
  const popupMenu = document.querySelector(".userPage-popup-menu");

  moreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popupMenu.style.display = popupMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", () => {
    popupMenu.style.display = "none";
  });

  popupMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const menuItems = popupMenu.querySelectorAll("li");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      popupMenu.style.display = "none";
    });
  });

  // --- MODAL ---
  const openBtn = document.querySelector(".edit-profile-btn");
  const overlay = document.getElementById("userPageOverlay");
  const modal = document.getElementById("userPageModal");
  const closeBtn = document.getElementById("userPageCloseBtn");
  const saveBtn = document.getElementById("userPageSaveBtn");

  function openModal() {
  overlay.classList.add("active");
}

function closeModal() {
  overlay.classList.remove("active");
}

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (saveBtn) saveBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (!modal.contains(e.target)) {
      closeModal();
    }
  });
});

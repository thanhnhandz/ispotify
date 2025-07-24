// Mở popup
const plusIcon3 = document.querySelector(
  ".container-sidebar-right-boxx3-popup--btn"
);
const popup3 = document.querySelector(".container-sidebar-right-boxx3-popup");
const cancelBtn3 = document.querySelector(
  ".container-sidebar-right-boxx3-cancel"
);
const confirmBtn3 = document.querySelector(
  ".container-sidebar-right-boxx3-confirm"
);3

// Toggle chọn playlist
function toggleSelect3(el) {
  el.classList.toggle("container-sidebar-right-boxx3-selected");
}

if (plusIcon3 && popup3 && cancelBtn3 && confirmBtn3) {
  // Mở popup khi click vào icon
  plusIcon3.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn sự kiện lan vào trong popup
    popup3.classList.add("container-sidebar-right-boxx3-active");
  });

  // Đóng popup khi click "Hủy"
  cancelBtn3.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn document click đóng popup trước
    popup3.classList.remove("container-sidebar-right-boxx3-active");
  });

  // Đóng popup khi click "Xong"
  confirmBtn3.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn document click đóng popup trước
    popup3.classList.remove("container-sidebar-right-boxx3-active");
  });
  // Đóng popup khi click ra ngoài
  document.addEventListener("click", function (e) {
    if (!popup3.contains(e.target) && !plusIcon3.contains(e.target)) {
      popup3.classList.remove("container-sidebar-right-boxx3-active");
    }
  });
}
// box lời bìa hát
const lyric = document.getElementById("lyric");
  const toggleBtn = document.getElementById("toggleBtn");

  toggleBtn.addEventListener("click", () => {
    lyric.classList.toggle("expanded");
    toggleBtn.textContent = lyric.classList.contains("expanded")
      ? "Hiển thị ít hơn"
      : "...Xem thêm";
  });
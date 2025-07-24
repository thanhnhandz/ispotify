document.addEventListener("DOMContentLoaded", function () {
  const followBtn = document.querySelector(".container-box-artistdetailPage-follow-btn");

  if (!followBtn) return; // Không tìm thấy thì không làm gì cả

  followBtn.addEventListener("click", function () {
    followBtn.classList.toggle("following");
    followBtn.textContent = followBtn.classList.contains("following")
      ? "Đang theo dõi"
      : "Theo dõi";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll(".container-box-artistdetailPage-item");
  const toggleBtn = document.getElementById("toggleListBtn-artistPage");

  if (!toggleBtn || listItems.length <= 5) return;

  // Ẩn tất cả item từ vị trí 5 trở đi
  for (let i = 5; i < listItems.length; i++) {
    listItems[i].classList.add("hidden");
  }

  let expanded = false;

  toggleBtn.addEventListener("click", function () {
    expanded = !expanded;

    for (let i = 5; i < listItems.length; i++) {
      listItems[i].classList.toggle("hidden", !expanded);
    }

    toggleBtn.textContent = expanded ? "Ẩn bớt" : "Xem thêm";
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const introSummary = document.getElementById("artistIntroSummary");
    const introModal = document.getElementById("artistIntroModal");
    const closeModalBtn = document.getElementById("closeIntroModal");

    if (introSummary && introModal && closeModalBtn) {
      // Mở modal khi click vào summary
      introSummary.addEventListener("click", () => {
        introModal.classList.add("show");
        document.body.style.overflow = "hidden";
      });

      // Đóng modal khi click vào nút close
      closeModalBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        introModal.classList.remove("show");
        document.body.style.overflow = "";
      });
    } else {
      console.warn("Không tìm thấy một số phần tử modal");
    }
  });
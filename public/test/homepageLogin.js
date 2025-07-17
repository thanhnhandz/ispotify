// Toggle avatar dropdown
const avatarBtn = document.getElementById("avatarBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
if (avatarBtn && dropdownMenu) {
  avatarBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const isVisible = dropdownMenu.style.display === "block";
    dropdownMenu.style.display = isVisible ? "none" : "block";
  });
  document.addEventListener("click", function () {
    dropdownMenu.style.display = "none";
  });
  dropdownMenu.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}

// Play button logic
window.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(
    ".footer-homepage-controls-fa-play"
  );
  const icon = playButton?.querySelector("i");
  const audio = document.getElementById("audio");
  const currentTimeDisplay = document.getElementById("currentTime");
  const durationDisplay = document.getElementById("duration");
  const progressFill = document.getElementById("progressFill");
  const progressBar = document.getElementById("progressBar");

  if (
    playButton &&
    icon &&
    audio &&
    currentTimeDisplay &&
    durationDisplay &&
    progressFill &&
    progressBar
  ) {
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
    }

    playButton.addEventListener("click", function () {
      const isPlaying = icon.classList.contains("fa-pause");
      icon.classList.toggle("fa-pause", !isPlaying);
      icon.classList.toggle("fa-play", isPlaying);
      isPlaying ? audio.pause() : audio.play();
    });

    audio.addEventListener("timeupdate", function () {
      const current = audio.currentTime;
      const duration = audio.duration;
      currentTimeDisplay.textContent = formatTime(current);
      durationDisplay.textContent = formatTime(duration);
      progressFill.style.width = `${(current / duration) * 100}%`;
    });

    audio.addEventListener("loadedmetadata", function () {
      durationDisplay.textContent = formatTime(audio.duration);
    });

    progressBar.addEventListener("click", function (e) {
      const duration = audio.duration;
      audio.currentTime = (e.offsetX / progressBar.clientWidth) * duration;
    });
  }
});

// Search box toggle
window.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.getElementById("searchWrapper");
  const input = document.getElementById("searchInput");
  const icon = document.getElementById("searchIcon");
  if (wrapper && input && icon) {
    icon.addEventListener("click", () => {
      wrapper.classList.toggle("expanded");
      if (wrapper.classList.contains("expanded")) input.focus();
    });
  }
});

// Sidebar dropdown box1
const box1_list = document.getElementById("box1_list");
const sidebar_box1 = document.getElementById("sidebar_box1");
if (box1_list && sidebar_box1) {
  sidebar_box1.addEventListener("click", function (e) {
    e.stopPropagation();
    const isVisible = box1_list.style.display === "block";
    box1_list.style.display = isVisible ? "none" : "block";
  });
  document.addEventListener("click", function () {
    box1_list.style.display = "none";
  });
  box1_list.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}

// Sort menu toggle
const sortToggle = document.querySelector(".container-sidebar_box3-sort");
const sortMenuClick = document.querySelector(
  ".container-sidebar_box3-sort-menu"
);
if (sortToggle && sortMenuClick) {
  sortToggle.addEventListener("click", () => {
    setTimeout(() => {
      sortMenuClick.style.display = "block";
    }, 0);
  });
  document.addEventListener("click", function () {
    sortMenuClick.style.display = "none";
  });
}

// Sort option select
const sortMenu = document.querySelector(".container-sidebar_box3-sort-menu");
if (sortMenu) {
  const options = sortMenu.querySelectorAll(
    ".container-sidebar_box3-sort-option"
  );
  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((opt) => {
        opt.classList.remove("selected");
        opt.querySelector(".container-sidebar_box3-checkmark")?.remove();
      });
      option.classList.add("selected");
      if (!option.querySelector(".container-sidebar_box3-checkmark")) {
        const checkmark = document.createElement("span");
        checkmark.classList.add("container-sidebar_box3-checkmark");
        checkmark.textContent = "✔";
        option.appendChild(checkmark);
      }
    });
  });
}

// Footer button toggle logic
window.addEventListener("DOMContentLoaded", function () {
  const btn1 = document.querySelectorAll(".footer-homepage-controls-btn")[0];
  const btn5 = document.querySelector(".footer-homepage-controls-btn-repeat");
  const btn6 = document.querySelector(".footer-homepage-controls-btn-repeat1");
  const ACTIVE_CLASS = "footer-homepage-controls-active";

  function toggleClass(button) {
    button.classList.toggle(ACTIVE_CLASS);
  }

  if (btn1) btn1.addEventListener("click", () => toggleClass(btn1));
  if (btn5 && btn6) {
    btn5.addEventListener("click", () => {
      const isActive = btn5.classList.contains(ACTIVE_CLASS);
      toggleClass(btn5);
      if (!isActive) btn6.classList.remove(ACTIVE_CLASS);
    });
    btn6.addEventListener("click", () => {
      const isActive = btn6.classList.contains(ACTIVE_CLASS);
      toggleClass(btn6);
      if (!isActive) btn5.classList.remove(ACTIVE_CLASS);
    });
  }
});

// Volume control
const volumeIcon = document.querySelector(
  ".footer-homepage-right-btn--valume i"
);
const volumeSlider = document.querySelector(
  ".footer-homepage-right-volume-bar"
);
const audio = document.getElementById("audio");
if (volumeIcon && volumeSlider && audio) {
  function updateVolumeIcon(volume) {
    volumeIcon.className =
      volume === 0
        ? "fa-solid fa-volume-xmark"
        : volume <= 30
        ? "fa-solid fa-volume-off"
        : volume <= 70
        ? "fa-solid fa-volume-low"
        : "fa-solid fa-volume-high";
  }
  volumeSlider.addEventListener("input", () => {
    const volume = parseInt(volumeSlider.value);
    updateVolumeIcon(volume);
    audio.volume = volume / 100;
    updateVolumeSliderColor(volumeSlider);
  });
  volumeIcon.parentElement?.addEventListener("click", () => {
    volumeSlider.value = 0;
    updateVolumeIcon(0);
    audio.volume = 0;
    updateVolumeSliderColor(volumeSlider);
  });
  function updateVolumeSliderColor(slider) {
    const value = slider.value;
    slider.style.background = `linear-gradient(to right, #1db954 ${value}%, #ccc ${value}%)`;
  }
  updateVolumeSliderColor(volumeSlider);
}

// Sidebar playlist item select
const playlistItems = document.querySelectorAll(
  ".container-sidebar_box4-playlist--item"
);
if (playlistItems.length) {
  playlistItems.forEach((item) => {
    item.addEventListener("click", () => {
      playlistItems.forEach((i) => {
        i.classList.remove("selected");
        i.querySelector(".liked-song-icon")?.remove();
      });
      item.classList.add("selected");
      if (!item.querySelector(".liked-song-icon")) {
        const likedIcon = document.createElement("div");
        likedIcon.classList.add("liked-song-icon");
        likedIcon.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        item.appendChild(likedIcon);
      }
    });
  });
}

// Popup mở thêm playlist
function toggleSelect(el) {
  el.classList.toggle("container-sidebar-right-boxx-selected");
}
const plusIcon = document.querySelector(".fa-square-plus");
const popup = document.querySelector(".container-sidebar-right-boxx-popup");
const cancelBtn = document.querySelector(
  ".container-sidebar-right-boxx-cancel"
);
const confirmBtn = document.querySelector(
  ".container-sidebar-right-boxx-confirm"
);
if (plusIcon && popup && cancelBtn && confirmBtn) {
  plusIcon.addEventListener("click", () =>
    popup.classList.add("container-sidebar-right-boxx-active")
  );
  cancelBtn.addEventListener("click", () =>
    popup.classList.remove("container-sidebar-right-boxx-active")
  );
  confirmBtn.addEventListener("click", () =>
    popup.classList.remove("container-sidebar-right-boxx-active")
  );
}

// Popup mở từ icon dưới footer
function toggleSelect1(el) {
  el.classList.toggle("container-sidebar-right-boxx1-selected");
}
const plusIcon1 = document.querySelector(
  ".footer-homepage-left--plusicon-plus"
);
const popup1 = document.querySelector(".container-sidebar-right-boxx1-popup");
const cancelBtn1 = document.querySelector(
  ".container-sidebar-right-boxx1-cancel"
);
const confirmBtn1 = document.querySelector(
  ".container-sidebar-right-boxx1-confirm"
);
if (plusIcon1 && popup1 && cancelBtn1 && confirmBtn1) {
  plusIcon1.addEventListener("click", () =>
    popup1.classList.add("container-sidebar-right-boxx1-popup-active")
  );
  cancelBtn1.addEventListener("click", () => {
    popup1.classList.remove("container-sidebar-right-boxx1-popup-active");
  });
  confirmBtn1.addEventListener("click", () => {
    popup1.classList.remove("container-sidebar-right-boxx1-popup-active");
  });
}
// danh sách chờ
const toggleBtn = document.getElementById("togglePlaylist");
const playlistList = document.getElementById("playlistList");


// bật tắt dsc và tt bài hát
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".footer-homepage-right-btn");
    const playingList = document.querySelector(".container-sidebar-right-playing_list");
    const waitingList = document.querySelector(".container-sidebar-right-waiting_list");
    const sidebarRight = document.querySelector(".container-sidebar-right");

    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const isActive = this.classList.contains("footer-homepage-right-active");

            // Xóa tất cả trạng thái active trước
            buttons.forEach((b) => {
                b.classList.remove("footer-homepage-right-active");
                const dot = b.querySelector(".footer-homepage-right-dot");
                if (dot) dot.remove();
            });

            // Toggle nếu chưa active
            if (!isActive) {
                this.classList.add("footer-homepage-right-active");
                const span = document.createElement("span");
                span.className = "footer-homepage-right-dot";
                this.appendChild(span);
            }

            // Hiển thị các khối tương ứng
            const isPlayBtn = this.querySelector(".fa-circle-play");
            const isListCheckBtn = this.querySelector(".fa-list-check");

            playingList.style.display = "none";
            waitingList.style.display = "none";

            if (this.classList.contains("footer-homepage-right-active")) {
                if (isPlayBtn) playingList.style.display = "block";
                if (isListCheckBtn) waitingList.style.display = "block";
            }

            // Ẩn toàn bộ nếu không có nút nào active
            const anyActive = document.querySelector(".footer-homepage-right-btn.footer-homepage-right-active");
            sidebarRight.style.display = anyActive ? "block" : "none";
        });
    });

    // ✅ Xử lý click vào nút close
    const closeBtn = document.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            const listCheckBtn = Array.from(buttons).find(btn =>
                btn.querySelector(".fa-list-check")
            );
            if (listCheckBtn) {
                listCheckBtn.classList.remove("footer-homepage-right-active");
                const dot = listCheckBtn.querySelector(".footer-homepage-right-dot");
                if (dot) dot.remove();
            }

            waitingList.style.display = "none";

            // Kiểm tra lại trạng thái toàn bộ
            const anyActive = document.querySelector(".footer-homepage-right-btn.footer-homepage-right-active");
            sidebarRight.style.display = anyActive ? "block" : "none";
        });
    }

    // ✅ Xử lý click vào nút toggle danh sách chờ
    const toggleWaitingBtn = document.querySelector(".container-sidebar-right-toggle-btn");
    if (toggleWaitingBtn) {
        toggleWaitingBtn.addEventListener("click", function () {
            const listCheckBtn = Array.from(buttons).find(btn =>
                btn.querySelector(".fa-list-check")
            );
            if (!listCheckBtn) return;

            const isActive = listCheckBtn.classList.contains("footer-homepage-right-active");

            // Nếu đang active thì tắt
            if (isActive) {
                listCheckBtn.classList.remove("footer-homepage-right-active");
                const dot = listCheckBtn.querySelector(".footer-homepage-right-dot");
                if (dot) dot.remove();
                waitingList.style.display = "none";
            } else {
                // Tắt tất cả các nút khác
                buttons.forEach((b) => {
                    b.classList.remove("footer-homepage-right-active");
                    const dot = b.querySelector(".footer-homepage-right-dot");
                    if (dot) dot.remove();
                });

                // Bật lại nút list-check
                listCheckBtn.classList.add("footer-homepage-right-active");
                const span = document.createElement("span");
                span.className = "footer-homepage-right-dot";
                listCheckBtn.appendChild(span);

                playingList.style.display = "none";
                waitingList.style.display = "block";
            }

            // Kiểm tra toàn bộ
            const anyActive = document.querySelector(".footer-homepage-right-btn.footer-homepage-right-active");
            sidebarRight.style.display = anyActive ? "block" : "none";
        });
    }

});
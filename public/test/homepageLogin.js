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
document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const playButton = document.querySelector(
    ".footer-homepage-controls-fa-play"
  );
  const icon = playButton?.querySelector("i");
  const audio = document.getElementById("audio");
  const currentTimeDisplay = document.getElementById("currentTime");
  const durationDisplay = document.getElementById("duration");
  const progressFill = document.getElementById("progressFill");
  const progressBar = document.getElementById("progressBar");

  const lyricLines = document.querySelectorAll(".lyric-line");
  const lyricsContainer = document.querySelector(".lyrics-container");

  // State variable
  let currentLyricIndex = -1;

  // Helper: Format time (seconds to M:SS)
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  }

  // Highlight and scroll lyrics
  function updateLyricsHighlight() {
    if (!audio || !lyricLines || lyricLines.length === 0) return;

    const currentTime = audio.currentTime;
    let newActiveIndex = -1;

    for (let i = 0; i < lyricLines.length; i++) {
      const startTime = parseFloat(lyricLines[i].dataset.startTime);
      let nextLineStartTime =
        i + 1 < lyricLines.length
          ? parseFloat(lyricLines[i + 1].dataset.startTime)
          : audio.duration || Infinity;

      if (currentTime >= startTime && currentTime < nextLineStartTime) {
        newActiveIndex = i;
        break;
      }
    }

    if (newActiveIndex !== currentLyricIndex) {
      if (currentLyricIndex !== -1 && lyricLines[currentLyricIndex]) {
        lyricLines[currentLyricIndex].classList.remove("active");
      }

      if (newActiveIndex !== -1 && lyricLines[newActiveIndex]) {
        lyricLines[newActiveIndex].classList.add("active");
        scrollLyricsIntoView(lyricLines[newActiveIndex]);
      } else {
        // Scroll to top for intro sections if applicable
        if (
          currentTime < parseFloat(lyricLines[0].dataset.startTime) &&
          lyricsContainer.scrollTop !== 0
        ) {
          lyricsContainer.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      currentLyricIndex = newActiveIndex;
    }
  }

  // Scroll active lyric line into view based on `linesToShowAbove`
  function scrollLyricsIntoView(activeLine) {
    if (!activeLine || !lyricsContainer) return;

    const containerHeight = lyricsContainer.offsetHeight;
    const lineHeight = activeLine.offsetHeight;
    const lineOffsetTop = activeLine.offsetTop;
    const paddingTop =
      parseFloat(getComputedStyle(lyricsContainer).paddingTop) || 0;

    // Number of lines to show above the active line
    const linesToShowAbove = 7;

    // Calculate scroll position to keep `linesToShowAbove` visible above active line
    let scrollPosition =
      lineOffsetTop - linesToShowAbove * lineHeight - paddingTop;

    // Prevent scrolling above the top limit
    if (scrollPosition < 0) {
      scrollPosition = 0;
    }

    // Special case: scroll to bottom for the last few lines
    const lastLinesThreshold = 3;
    if (
      (lyricLines.length > 0 &&
        activeLine === lyricLines[lyricLines.length - 1]) ||
      (currentLyricIndex !== -1 &&
        lyricLines.length - 1 - currentLyricIndex < lastLinesThreshold)
    ) {
      scrollPosition = lyricsContainer.scrollHeight - containerHeight;
    }

    lyricsContainer.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  }

  // Check if all necessary DOM elements exist
  if (
    playButton &&
    icon &&
    audio &&
    currentTimeDisplay &&
    durationDisplay &&
    progressFill &&
    progressBar &&
    lyricsContainer &&
    lyricLines.length > 0
  ) {
    // Play/Pause button logic
    playButton.addEventListener("click", function () {
      const isPlaying = icon.classList.contains("fa-pause");
      icon.classList.toggle("fa-pause", !isPlaying);
      icon.classList.toggle("fa-pause-controls", !isPlaying);
      icon.classList.toggle("fa-play", isPlaying);
      icon.classList.toggle("fa-play-controls", isPlaying);
      isPlaying ? audio.pause() : audio.play();
    });

    // Update time and progress bar
    audio.addEventListener("timeupdate", function () {
      const current = audio.currentTime;
      const duration = audio.duration;

      currentTimeDisplay.textContent = formatTime(current);
      if (!isNaN(duration) && duration > 0) {
        durationDisplay.textContent = formatTime(duration);
        progressFill.style.width = `${(current / duration) * 100}%`;
      } else {
        durationDisplay.textContent = "0:00";
        progressFill.style.width = "0%";
      }
      updateLyricsHighlight(); // Update lyrics on time change
    });

    // Set total duration when audio metadata is loaded
    audio.addEventListener("loadedmetadata", function () {
      if (!isNaN(audio.duration)) {
        durationDisplay.textContent = formatTime(audio.duration);
      } else {
        durationDisplay.textContent = "0:00";
      }
      updateLyricsHighlight(); // Initial lyrics update
    });

    // Handle song ending
    audio.addEventListener("ended", function () {
      if (currentLyricIndex !== -1 && lyricLines[currentLyricIndex]) {
        lyricLines[currentLyricIndex].classList.remove("active");
      }
      currentLyricIndex = -1;
      lyricsContainer.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");
      progressFill.style.width = "0%";
      currentTimeDisplay.textContent = "0:00";
    });

    // Handle progress bar click (seeking)
    progressBar.addEventListener("click", function (e) {
      const duration = audio.duration;
      if (isNaN(duration) || duration <= 0) return;

      const clickX = e.offsetX;
      const barWidth = progressBar.clientWidth;
      audio.currentTime = (clickX / barWidth) * duration;
      updateLyricsHighlight(); // Update lyrics immediately after seek
    });

    // Handle audio seeking events
    audio.addEventListener("seeked", function () {
      updateLyricsHighlight(); // Update lyrics after seeking finishes
    });

    // Initial setup on page load
    updateLyricsHighlight();
  } else {
    console.error(
      "Missing one or more required DOM elements for player or lyrics. Please check your HTML."
    );
  }
  // Handle secondary play/pause button (playlistPage)
  const playlistPlayButton = document.querySelector(
    ".container-box-component-playlistPage-btn-play"
  );
  const playlistIconPlay = playlistPlayButton?.querySelector(".icon-play");
  const playlistIconPause = playlistPlayButton?.querySelector(".icon-pause");

  if (playlistPlayButton && playlistIconPlay && playlistIconPause) {
    playlistPlayButton.addEventListener("click", function () {
      const isPlaying =
        !playlistIconPlay.style.display ||
        playlistIconPlay.style.display !== "none";

      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
      // Update both control buttons
      icon.classList.toggle("fa-pause", isPlaying);
      icon.classList.toggle("fa-play", !isPlaying);

      playlistIconPlay.style.display = isPlaying ? "none" : "inline";
      playlistIconPause.style.display = isPlaying ? "inline" : "none";
    });

    // Sync UI when play triggered from other button
    audio.addEventListener("play", () => {
      icon.classList.add("fa-pause", "fa-pause-controls");
      icon.classList.remove("fa-play", "fa-play-controls");

      if (playlistIconPlay && playlistIconPause) {
        playlistIconPlay.style.display = "none";
        playlistIconPause.style.display = "inline";
      }
    });

    audio.addEventListener("pause", () => {
      icon.classList.remove("fa-pause", "fa-pause-controls");
      icon.classList.add("fa-play" , "fa-play-controls");
      if (playlistIconPlay && playlistIconPause) {
        playlistIconPlay.style.display = "inline";
        playlistIconPause.style.display = "none";
      }
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
  const ACTIVE_CLASS = "footer-homepage-controls-active";

  // Shuffle buttons
  const shuffleFooterBtn = document.querySelectorAll(
    ".footer-homepage-controls-btn"
  )[0]; // shuffle ở footer
  const shufflePlaylistBtn = document.querySelector(
    ".container-box-component-playlistPage-controls-btn"
  ); // shuffle ở playlist

  // Repeat buttons
  const repeatBtn = document.querySelector(
    ".footer-homepage-controls-btn-repeat"
  );
  const repeatOneBtn = document.querySelector(
    ".footer-homepage-controls-btn-repeat1"
  );

  // Toggle class cho cả 2 nút shuffle
  function toggleShuffleButtons() {
    shuffleFooterBtn?.classList.toggle(ACTIVE_CLASS);
    shufflePlaylistBtn?.classList.toggle(ACTIVE_CLASS);
  }

  // Toggle class đơn giản
  function toggleClass(button) {
    button.classList.toggle(ACTIVE_CLASS);
  }

  // Sự kiện cho nút shuffle ở footer và playlist
  if (shuffleFooterBtn && shufflePlaylistBtn) {
    shuffleFooterBtn.addEventListener("click", toggleShuffleButtons);
    shufflePlaylistBtn.addEventListener("click", toggleShuffleButtons);
  }

  // Xử lý repeat và repeat1 (loại trừ nhau)
  if (repeatBtn && repeatOneBtn) {
    repeatBtn.addEventListener("click", () => {
      const isActive = repeatBtn.classList.contains(ACTIVE_CLASS);
      toggleClass(repeatBtn);
      if (!isActive) repeatOneBtn.classList.remove(ACTIVE_CLASS);
    });

    repeatOneBtn.addEventListener("click", () => {
      const isActive = repeatOneBtn.classList.contains(ACTIVE_CLASS);
      toggleClass(repeatOneBtn);
      if (!isActive) repeatBtn.classList.remove(ACTIVE_CLASS);
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
const plusIcon = document.querySelector(".fa-square-plus-icon");
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
    popup1.classList.add("container-sidebar-right-boxx1-active")
  );
  cancelBtn1.addEventListener("click", () => {
    popup1.classList.remove("container-sidebar-right-boxx1-active");
  });
  confirmBtn1.addEventListener("click", () => {
    popup1.classList.remove("container-sidebar-right-boxx1-active");
  });
}
// Popup mở thêm playlist

// Mở popup
const plusIcon2 = document.querySelector(
  ".container-sidebar-right-waiting-list-menu-item-boxx2"
);
const popup2 = document.querySelector(".container-sidebar-right-boxx2-popup");
const cancelBtn2 = document.querySelector(
  ".container-sidebar-right-boxx2-cancel"
);
const confirmBtn2 = document.querySelector(
  ".container-sidebar-right-boxx2-confirm"
);

// Toggle chọn playlist
function toggleSelect2(el) {
  el.classList.toggle("container-sidebar-right-boxx2-selected");
}

if (plusIcon2 && popup2 && cancelBtn2 && confirmBtn2) {
  // Mở popup khi click vào icon
  plusIcon2.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn sự kiện lan vào trong popup
    popup2.classList.add("container-sidebar-right-boxx2-active");
  });

  // Đóng popup khi click "Hủy"
  cancelBtn2.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn document click đóng popup trước
    popup2.classList.remove("container-sidebar-right-boxx2-active");
  });

  // Đóng popup khi click "Xong"
  confirmBtn2.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn document click đóng popup trước
    popup2.classList.remove("container-sidebar-right-boxx2-active");
  });
  // Đóng popup khi click ra ngoài
  document.addEventListener("click", function (e) {
    if (!popup2.contains(e.target) && !plusIcon2.contains(e.target)) {
      popup2.classList.remove("container-sidebar-right-boxx2-active");
    }
  });
}

// bật tắt dsc và tt bài hát
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".footer-homepage-right-btn");
  const playingList = document.querySelector(
    ".container-sidebar-right-playing-list"
  );
  const waitingList = document.querySelector(
    ".container-sidebar-right-waiting-list"
  );
  const sidebarRight = document.querySelector(".container-sidebar-right");

  const boxContent1 = document.querySelector(".container-box-content1");
  const boxContent2 = document.querySelector(".container-box-content2");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const isActive = this.classList.contains("footer-homepage-right-active"); // Xóa tất cả trạng thái active trước

      buttons.forEach((b) => {
        b.classList.remove("footer-homepage-right-active");
        const dot = b.querySelector(".footer-homepage-right-dot");
        if (dot) dot.remove();
      }); // Toggle nếu chưa active

      if (!isActive) {
        this.classList.add("footer-homepage-right-active");
        const span = document.createElement("span");
        span.className = "footer-homepage-right-dot";
        this.appendChild(span);
      } // Biến để theo dõi trạng thái hiển thị của sidebarRight và boxContents

      let displaySidebarRight = "none"; // Mặc định ẩn sidebarRight
      let displayBoxContent1 = "block"; // Mặc định boxContent1 hiển thị
      let displayBoxContent2 = "none"; // Mặc định boxContent2 ẩn // Ẩn playingList và waitingList mặc định

      playingList.style.display = "none";
      waitingList.style.display = "none"; // Lấy lại các nút đã được xác định

      const isPlayBtn = this.querySelector(".fa-circle-play");
      const isListCheckBtn = this.querySelector(".fa-list-check");
      const isMicrophone = this.querySelector(".fa-microphone");

      if (this.classList.contains("footer-homepage-right-active")) {
        if (isPlayBtn) {
          playingList.style.display = "block";
          displaySidebarRight = "block"; // Sidebar hiển thị với nút Play
          displayBoxContent1 = "block"; // Content1 hiển thị
          displayBoxContent2 = "none"; // Content2 ẩn
        } else if (isListCheckBtn) {
          waitingList.style.display = "block";
          displaySidebarRight = "block"; // Sidebar hiển thị với nút List-check
        } else if (isMicrophone) {
          displaySidebarRight = "none"; // Sidebar RIGHT ẩn với nút Microphone
          displayBoxContent1 = "none"; // Content1 ẩn
          displayBoxContent2 = "block"; // Content2 hiển thị
        }
      } else {
        // Nếu nút vừa click bị tắt (tức là isActive là true ban đầu và bây giờ nó bị xóa active)
        // Đảm bảo tất cả các list và boxContent về trạng thái mặc định/ẩn
        playingList.style.display = "none";
        waitingList.style.display = "none";
        displaySidebarRight = "none"; // SidebarRight ẩn
        displayBoxContent1 = "block"; // Content1 hiển thị (mặc định)
        displayBoxContent2 = "none"; // Content2 ẩn
      } // Áp dụng trạng thái hiển thị cuối cùng

      sidebarRight.style.display = displaySidebarRight;
      if (boxContent1) boxContent1.style.display = displayBoxContent1;
      if (boxContent2) boxContent2.style.display = displayBoxContent2;
    }); // bật tắt box container-box-content2
  }); // Xử lý click vào nút close

  const closeBtn = document.querySelector(
    ".container-sidebar-right-waiting-list-close-btn"
  );
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      const listCheckBtn = Array.from(buttons).find((btn) =>
        btn.querySelector(".fa-list-check")
      );
      if (listCheckBtn) {
        listCheckBtn.classList.remove("footer-homepage-right-active");
        const dot = listCheckBtn.querySelector(".footer-homepage-right-dot");
        if (dot) dot.remove();
      }

      waitingList.style.display = "none";
      // Khi đóng waitingList, sidebarRight sẽ ẩn và boxContent1 hiện, boxContent2 ẩn
      sidebarRight.style.display = "none";
      if (boxContent1) boxContent1.style.display = "block";
      if (boxContent2) boxContent2.style.display = "none"; // Dòng kiểm tra anyActive này không còn cần thiết ở đây vì đã đặt rõ ràng // const anyActive = document.querySelector(".footer-homepage-right-btn.footer-homepage-right-active"); // sidebarRight.style.display = anyActive ? "block" : "none";
    });
  } // Xử lý click vào nút toggle danh sách chờ

  const toggleWaitingBtn = document.querySelector(
    ".container-sidebar-right-toggle-btn"
  );
  if (toggleWaitingBtn) {
    toggleWaitingBtn.addEventListener("click", function () {
      const listCheckBtn = Array.from(buttons).find((btn) =>
        btn.querySelector(".fa-list-check")
      );
      if (!listCheckBtn) return;

      const isActive = listCheckBtn.classList.contains(
        "footer-homepage-right-active"
      );

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
      const anyActive = document.querySelector(
        ".footer-homepage-right-btn.footer-homepage-right-active"
      );
      sidebarRight.style.display = anyActive ? "block" : "none";
    });
  }
});

const menu = document.getElementById("contextMenu");
const buttons = document.querySelectorAll(
  ".container-sidebar-right-waiting-list-more-btn, .playlist-more-icon, .container-box-component-songDetail-propose-item-box3-time-ellipsis"
);

const scrollContainer1 = document.querySelector(
  ".container-sidebar-right-waiting-list"
);
const scrollContainer2 = document.querySelector(".container-box-content");

let menuTriggerElement = null;
let currentScrollContainer = null;

// Hàm hiển thị menu tại vị trí của phần tử được click
function showContextMenu(btn) {
  const rect = btn.getBoundingClientRect();

  menu.style.position = "absolute";
  menu.style.top = rect.bottom + window.scrollY + "px";
  menu.style.left = rect.left + window.scrollX - 300 + "px";
  menu.style.display = "block";
}

// Gán sự kiện click cho các nút ba chấm
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    menuTriggerElement = btn;

    // Xác định container nào là cha gần nhất có thể cuộn
    if (btn.closest(".container-sidebar-right-waiting-list")) {
      currentScrollContainer = scrollContainer1;
    } else if (btn.closest(".container-box-content")) {
      currentScrollContainer = scrollContainer2;
    } else {
      currentScrollContainer = null;
    }

    showContextMenu(btn);
  });
});

// Ẩn menu khi click ra ngoài
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target)) {
    menu.style.display = "none";
    menuTriggerElement = null;
    currentScrollContainer = null;
  }
});

// Scroll cả hai container đều cập nhật vị trí menu nếu menu đang hiển thị
function handleScroll() {
  if (menu.style.display === "block" && menuTriggerElement) {
    showContextMenu(menuTriggerElement);
  }
}

scrollContainer1?.addEventListener("scroll", handleScroll);
scrollContainer2?.addEventListener("scroll", handleScroll);

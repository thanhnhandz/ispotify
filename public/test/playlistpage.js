document.addEventListener("DOMContentLoaded", function () {
    const playBtn = document.querySelector('.container-box-component-playlistPage-btn-play');
    if (!playBtn) return; // Phòng tránh lỗi nếu không tìm thấy nút

    const iconPlay = playBtn.querySelector('.icon-play');
    const iconPause = playBtn.querySelector('.icon-pause');

    playBtn.addEventListener('click', function () {
      // Toggle hiển thị giữa play và pause
      const isPlaying = iconPlay.style.display === 'none';

      iconPlay.style.display = isPlaying ? 'inline' : 'none';
      iconPause.style.display = isPlaying ? 'none' : 'inline';
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const moreBtn = document.querySelector(".container-box-component-playlistPage-btn-icon");
  const popupMenu = document.querySelector(".playlist-popup-menu");

  moreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popupMenu.style.display = popupMenu.style.display === "block" ? "none" : "block";
  });

  // Ẩn popup khi click ra ngoài
  document.addEventListener("click", () => {
    popupMenu.style.display = "none";
  });

  // Ngăn chặn đóng khi click vào bên trong menu
  popupMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  // Ẩn popup khi click vào bất kỳ <li> trong menu
  const menuItems = popupMenu.querySelectorAll("li");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      popupMenu.style.display = "none";
    });
  });
});


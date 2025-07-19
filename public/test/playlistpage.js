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



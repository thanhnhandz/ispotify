document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menuSettingSong");
  const albumBox = document.getElementById("albumSelectBox");

  // Click vào dấu ba chấm để hiện menu
  document.querySelectorAll(".ellipsis-list-song").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation(); // Ngăn lan ra ngoài
      const rect = icon.getBoundingClientRect();
      menu.style.top = `${window.scrollY + rect.bottom}px`;
      menu.style.left = `${rect.left}px`;
      menu.style.display = "block";
      albumBox.style.display = "none"; // ẩn bảng album nếu đang mở
    });
  });

  // Ẩn tất cả khi click ngoài
  document.addEventListener("click", function () {
    menu.style.display = "none";
    albumBox.style.display = "none";
  });

  // Ngăn sự kiện click trong menu không lan ra làm ẩn menu
  menu.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menuSettingAlbum");

  // Click vào dấu ba chấm để hiện menu
  document.querySelectorAll(".ellipsis-list-album").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation(); // Ngăn lan ra ngoài
      const rect = icon.getBoundingClientRect();
      menu.style.top = `${window.scrollY + rect.bottom}px`;
      menu.style.left = `${rect.left}px`;
      menu.style.display = "block";
    });
  });

  // Ẩn tất cả khi click ngoài
  document.addEventListener("click", function () {
    menu.style.display = "none";
  });

  // Ngăn sự kiện click trong menu không lan ra làm ẩn menu
  menu.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
// Khi click vào "Thêm vào Album" => toggle album box
function toggleAlbumSelect(event) {
  event.stopPropagation(); // không cho click lan ra
  const albumBox = event.currentTarget.querySelector("#albumSelectBox");
  if (albumBox) {
    albumBox.style.display = "block";
  }
}

function confirmAddToAlbum(event) {
  event.stopPropagation();
  const box = event.currentTarget.closest("#albumSelectBox");
  const selected = box.querySelector('input[name="album"]:checked');
  if (selected) {
    box.style.display = "none";
  }
}

function cancelAddToAlbum(event) {
  event.stopPropagation();
  const box = event.currentTarget.closest("#albumSelectBox");
  box.style.display = "none";
}

function addNewAuthor() {
  const authorList = document.getElementById("box-addNewSong-authorList");

  const authorRow = document.createElement("div");
  authorRow.className = "box-addNewSong-author-row";

  const input = document.createElement("input");
  input.type = "text";
  input.name = "author[]";
  input.placeholder = "Nhập tên tác giả";
  input.className = "box-addNewSong-input box-addNewSong-author";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.innerText = "✖";
  removeBtn.className = "box-addNewSong-remove-author";
  removeBtn.onclick = function () {
    authorRow.remove();
  };

  authorRow.appendChild(input);
  authorRow.appendChild(removeBtn);
  authorList.appendChild(authorRow);
}

const overlay = document.getElementById("addNewSongOverlay");
const addBtn = document.querySelector(".add-new-song-box");

function toggleAddNewSong() {
  overlay.style.display = overlay.style.display === "flex" ? "none" : "flex";
}

addBtn.addEventListener("click", toggleAddNewSong);
function toggleSongs(clickedBox2) {
  const albumItem = clickedBox2.closest("li");
  const songList = albumItem.querySelector(".album-song-list");

  if (songList) {
    const isHidden = songList.style.display === "none" || songList.style.display === "";
    songList.style.display = isHidden ? "block" : "none";
  }
}

function toggleAddNewAlbum() {
  const overlay = document.getElementById("addNewAlbumOverlay");
  overlay.style.display = overlay.style.display === "flex" ? "none" : "flex";
}
// Khi click vào nút "Chỉnh sửa" trong menu
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".menu-edit-album").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation(); // Ngăn click lan ra làm ẩn menu
      const overlay = document.getElementById("addNewAlbumOverlay");

      // Hiển thị overlay
      overlay.style.display = "flex";

      // Nếu muốn prefill thông tin thì có thể lấy từ DOM hoặc data-* attribute

      // Ẩn menu sau khi click
      const albumMenu = document.getElementById("menuSettingAlbum");
      if (albumMenu) albumMenu.style.display = "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".menu-edit-song").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation(); // Ngăn click lan ra làm ẩn menu
      const overlay = document.getElementById("addNewSongOverlay");

      // Hiển thị overlay
      overlay.style.display = "flex";

      // Nếu muốn prefill thông tin thì có thể lấy từ DOM hoặc data-* attribute

      // Ẩn menu sau khi click
      const albumMenu = document.getElementById("menuSettingSong");
      if (albumMenu) albumMenu.style.display = "none";
    });
  });
});

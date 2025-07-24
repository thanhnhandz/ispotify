// Slider scroll logic
const sliders = document.querySelectorAll(".slider-container");
sliders.forEach((slider) => {
  const btnLeft = slider.querySelector(
    ".container-box-component--header--list--btn-left"
  );
  const btnRight = slider.querySelector(
    ".container-box-component--header--list--btn-right"
  );
  const list = slider.querySelector(".container-box-component--header--list");

  const scrollStep = 200;
  if (btnLeft && list) {
    btnLeft.addEventListener("click", () => {
      list.scrollLeft -= scrollStep;
    });
  }
  if (btnRight && list) {
    btnRight.addEventListener("click", () => {
      list.scrollLeft += scrollStep;
    });
  }
});

// Tắt bảng history search
const searchWrapper = document.querySelector(".header-left_search");
const input = searchWrapper?.querySelector("input");
const historyBox = document.querySelector(".header-left_search--history");

if (input && historyBox) {
  input.addEventListener("focus", () => {
    if (input.value.trim() === "") {
      historyBox.style.display = "block";
    }
  });

  input.addEventListener("input", () => {
    historyBox.style.display = "none";
  });

  document.addEventListener("click", function (e) {
    if (!searchWrapper.contains(e.target)) {
      historyBox.style.display = "none";
    }
  });
}

// Tooltip khi thêm playlist
const buttonPlaylist = document.querySelector(".container-sidebar_box-AddNewPlaylist--button");
const tooltip = document.querySelector(".tooltip-box");

if (buttonPlaylist && tooltip) {
  buttonPlaylist.addEventListener("focus", () => {
    if (buttonPlaylist.value.trim() === "") {
      tooltip.style.display = "block";
    }
  });

  buttonPlaylist.addEventListener("input", () => {
    tooltip.style.display = "none";
  });

  document.addEventListener("click", function (e) {
    if (!buttonPlaylist.contains(e.target)) {
      tooltip.style.display = "none";
    }
  });
}

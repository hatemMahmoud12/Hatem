const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      links = document.querySelectorAll("nav a"),
      icons = document.querySelectorAll("nav i"),
      logo = document.querySelector(".logo"),
    sidebarOpen = document.querySelector(".sidebarOpen"),
    siderbarClose = document.querySelector(".siderbarClose");

// كود JS لتبديل الشريط الجانبي
sidebarOpen.addEventListener("click", () => {
  nav.classList.add("active");
  links.forEach(link => {
      link.style.color = "white";
  });
});

body.addEventListener("click", e => {
  let clickedElm = e.target;

  if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
      nav.classList.remove("active");
  }
});

const changeNavBackground = function () {
    if (window.scrollY > 80) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        nav.style.transition = "background-color 0.3s ease";
        links.forEach(link => {
            link.style.color = "white";
        });
        icons.forEach(icon => {
            icon.style.color = "white";
        });
        logo.style = "filter: brightness(0) invert(1);";
    } else {
        nav.style.backgroundColor = "transparent";
        links.forEach(link => {
            link.style.color = "white";
        });
        icons.forEach(icon => {
            icon.style.color = "white";
        });
        logo.style = "filter: brightness(0) invert(1);";
    }
};

window.addEventListener("scroll", changeNavBackground);
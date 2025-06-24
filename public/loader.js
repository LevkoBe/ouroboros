(function () {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme =
    savedTheme === "dark" || (!savedTheme && prefersDark) ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", theme);

  const logo = document.getElementById("spinning-logo");
  if (logo) {
    logo.src = theme === "dark" ? "./logo-white.svg" : "./logo.svg";
  }
})();

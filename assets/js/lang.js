// Has to be in the head tag, otherwise a flicker effect will occur.

let initLang = () => {
  let lang = localStorage.getItem("lang") || "en";
  document.documentElement.setAttribute("data-language", lang);
};

let toggleLang = () => {
  let lang = document.documentElement.getAttribute("data-language") || "en";
  let next = lang === "en" ? "zh" : "en";
  localStorage.setItem("lang", next);
  document.documentElement.setAttribute("data-language", next);
};

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("lang-toggle");
  if (btn) btn.addEventListener("click", toggleLang);
});

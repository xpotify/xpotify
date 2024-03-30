const loader = document.getElementById("preloader");
const webLoader = document.getElementById("webLoader");
const prMetric = document.getElementById("preloaderMetricIMG");

window.addEventListener("load", () => {
    webLoader.classList.add("hide");
    tabs.classList.remove("hide");
});
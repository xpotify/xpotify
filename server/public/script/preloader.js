const loader = document.getElementById("preloader");
const webLoader = document.getElementById("webLoader");

const preloader = (tab) => {
    loader.classList.remove("hide");
    tabs.classList.add("hide");
    // window.addEventListener("load", () => {
    //     console.log("loaded");
    //     loader.classList.add("hide");
    //     playlistTabs.classList.remove("hide");
    // });
};

window.addEventListener("load", () => {
    webLoader.classList.add("hide");
    tabs.classList.remove("hide");
});

const loader = document.getElementById("preloader");
const webLoader = document.getElementById("webLoader");
const prMetric = document.getElementById("preloaderMetricIMG");

window.addEventListener("load", () => {
    webLoader.classList.add("hide");
    tabs.classList.remove("hide");
});


const showList = () => {
    var tabClass = playlistTabs.classList;
    if(tabClass[1] == "hide"){
            tabs.classList.add("hide");
            artistTab.classList.add("hide");
            songTabs.classList.add("hide");
            albumTabs.classList.add("hide");
            lyricsTabs.classList.add("hide");
            loader.classList.remove("hide");
            setTimeout(() => {
                loader.classList.add("hide");
                playlistTabs.classList.remove("hide");
            }, 2000);
    } else {
        // do nothing
    }
};

const showArtistTab = () => {
    var tabClass = artistTab.classList;
    if(tabClass[1] == "hide"){
            tabs.classList.add("hide");
            songTabs.classList.add("hide");
            albumTabs.classList.add("hide");
            lyricsTabs.classList.add("hide");
            playlistTabs.classList.add("hide");
            loader.classList.remove("hide");
            setTimeout(() => {
                loader.classList.add("hide");
                artistTab.classList.remove("hide");
            }, 2000);
    } else {
        // do nothing
    }
};

const returnToHome = () => {
    var tabClass = tabs.classList;
    if(tabClass[1] == "hide"){
            songTabs.classList.add("hide");
            albumTabs.classList.add("hide");
            lyricsTabs.classList.add("hide");
            playlistTabs.classList.add("hide");
            loader.classList.remove("hide");
            setTimeout(() => {
                loader.classList.add("hide");
                tabs.classList.remove("hide");
            }, 1000);
    } else {
        // do nothing
    }
};





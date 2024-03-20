const artistTab = document.getElementById("artistTabs");
const tabs = document.getElementById("tabs");
const songTabs = document.getElementById("songsTabs");
const albumTabs = document.getElementById("albumTabs");

const showArtistTab = () => {
    tabs.classList.add("hide");
    artistTab.classList.remove("hide");
    songTabs.classList.add("hide");
    albumTabs.classList.add("hide");
};

const returnToHome = () => {
    artistTab.classList.add("hide");
    tabs.classList.remove("hide");
    songTabs.classList.add("hide");
    albumTabs.classList.add("hide");
};

const showSongTab = () => {
    artistTab.classList.add("hide");
    tabs.classList.add("hide");
    songTabs.classList.remove("hide");
    albumTabs.classList.add("hide");
};

const showAlbumTab = () => {
    artistTab.classList.add("hide");
    tabs.classList.add("hide");
    songTabs.classList.add("hide");
    albumTabs.classList.remove("hide");
};
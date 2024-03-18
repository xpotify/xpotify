const artistTab = document.getElementById("artistTabs");
const tabs = document.getElementById("tabs");

const toggleArtistTab = () => {
    tabs.classList.toggle("hide");
    artistTab.classList.toggle("hide");
};

const returnToHome = () => {
    artistTab.classList.add("hide");
    tabs.classList.remove("hide");
};
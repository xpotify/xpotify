// Animation for Pinned Playlists

const pinnedPs = document.querySelectorAll(".playlist");
const pinnedPsBtns = document.querySelectorAll(".playBtn");

for(i=0; i < pinnedPs.length; i++){
    const x = i;
    pinnedPs[i].addEventListener("mouseenter", () => {
        pinnedPsBtns[x].classList.remove("hide");
    });

    pinnedPs[i].addEventListener("mouseleave", () => {
        pinnedPsBtns[x].classList.add("hide");
    });
};
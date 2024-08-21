// Animation for Pinned Playlists

const pinnedPs = document.querySelectorAll(".playlist");
const pinnedPsBtns = document.querySelectorAll(".playBtn");

const inp = document.querySelector("#searchInp");

for(i=0; i < pinnedPs.length; i++){
    const x = i;
    pinnedPs[i].addEventListener("mouseenter", () => {
        pinnedPsBtns[x].classList.remove("hide");
    });

    pinnedPs[i].addEventListener("mouseleave", () => {
        pinnedPsBtns[x].classList.add("hide");
    });
};

// inp.addEventListener("input", () => {
//     console.log(inp.value);
// });

// playlist button

const playlistCover = document.getElementsByClassName("playlistCover");
const btn = document.getElementsByClassName("playlistPlayBtn");

for(i=0; i < playlistCover.length; i++){
    const x = i;
    playlistCover[i].addEventListener("mouseenter", () => {
        btn[x].classList.add("playBtn");
    });

    playlistCover[i].addEventListener("mouseleave", () => {
        btn[x].classList.remove("playBtn");
    });
};

// playlistImg

const playlistCoverImage = document.getElementsByClassName("playlistCoverImage");

for(i=0; i < playlistCoverImage.length; i++){
    const x = i;
    playlistCoverImage[i].addEventListener("mouseenter", () => {
        playlistCoverImage[x].classList.add("opac50");
    });
    playlistCoverImage[i].addEventListener("mouseleave", () => {
        playlistCoverImage[x].classList.remove("opac50");
    });
};
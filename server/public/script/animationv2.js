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
const playlistCoverImage = document.getElementsByClassName("playlistCoverImage");

for(i=0; i < playlistCover.length; i++){
    const x = i;
    playlistCover[i].addEventListener("mouseenter", () => {
        btn[x].classList.add("playBtn");
        playlistCoverImage[x].classList.add("opac65");
    });

    playlistCover[i].addEventListener("mouseleave", () => {
        btn[x].classList.remove("playBtn");
        playlistCoverImage[x].classList.remove("opac65");
    });
};

const speaker = document.getElementById("speaker");
const volSlider = document.getElementById("volumeSlider");

speaker.addEventListener("mouseover", () => {
    volSlider.style.display = "block";
});

speaker.addEventListener("mouseout", () => {
    volSlider.style.display = "none";
});

audio.volume = 0.02;
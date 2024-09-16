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

// volume Slider

const speaker = document.getElementById("speaker");
const volSlider = document.getElementById("volumeSlider");

speaker.addEventListener("mouseover", () => {
    volSlider.style.display = "block";
});

// speaker.addEventListener("mouseout", () => {
//     volSlider.style.display = "none";
// });


volSlider.addEventListener("mouseout", () => {
    volSlider.style.display = "none";
});

// LargeTrackCover Animation
const tcanim = document.getElementById("trackSmallCoverImg");
const tcanim2 = document.getElementById("trackLargeCoverImg");

let tcstat = 0;

tcanim.addEventListener("click", () => {
    if(stat == 0){
        tcanim2.style.display = "block";
        setTimeout(() => {
            tcanim2.style.opacity = "1";
        }, 0);
        stat = 1;
    } else {
        tcanim2.style.opacity = "0";
        setTimeout(() => {
            tcanim2.style.display = "none";
        }, 500);
        stat = 0;
    }
});

// track Action buttons animation

const tracks = document.getElementsByClassName("track");
const trackActions = document.getElementsByClassName("rtrackActionOpts");

for(i=0; i < trackActions.length; i++){
    let x = i;
    tracks[i].addEventListener("mouseenter", () => {
        trackActions[x].style.visibility = "visible";
    });

    tracks[i].addEventListener("mouseleave", () => {
        trackActions[x].style.visibility = "hidden";
    });
};

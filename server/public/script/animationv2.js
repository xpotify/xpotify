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
const tcanim = document.getElementsByClassName("trackSmallCoverImg");
const tcanim2 = document.getElementById("trackLargeCoverImg");

let tcstat = 0;

tcanim[1].addEventListener("click", () => {
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
const cover = document.getElementsByClassName("rCover");
const pbtn = document.getElementsByClassName("playRtrack");

for(i=0; i < trackActions.length; i++){
    let x = i;
    tracks[i].addEventListener("mouseenter", () => {
        trackActions[x].style.visibility = "visible";
        cover[x].style.opacity = `${50}%`;
        pbtn[x].style.visibility = "visible";
    });

    tracks[i].addEventListener("mouseleave", () => {
        trackActions[x].style.visibility = "hidden";
        cover[x].style.opacity = `${100}%`;
        pbtn[x].style.visibility = "hidden";
    });
};


// window1 

const genreBtn = document.getElementsByClassName("tomBtns");
const playlists = document.getElementsByClassName("playlists");
const lyricsBtn = document.getElementById("lyricsBtn");
const window1 = document.getElementsByClassName("window1");
const lBtn = document.getElementById("lBtn");

let lStat = false;

lyricsBtn.addEventListener("click", () => {
    if(lStat == false){
        genreBtn[0].classList.add("remHide");
        for(i=0; i < playlists.length; i++){
            playlists[i].classList.add("remHide");
        };
        lyricsBtn.classList.add("bfbtn");
        window1[0].classList.remove("remHide");
        lBtn.style.borderBottom = "2px solid white";
        qBtn.style.borderBottom = "2px solid transparent";
        lyrics[0].classList.remove("remHide");
        queue[0].classList.add("remHide");
        lStat = true;
    } else {
        genreBtn[0].classList.remove("remHide");
        for(i=0; i < playlists.length; i++){
            playlists[i].classList.remove("remHide");
        };
        lyricsBtn.classList.remove("bfbtn");
        window1[0].classList.add("remHide");
        lStat = false;
    }
});

// Lyrics Button and Queue Button Animation

const lyrics = document.getElementsByClassName("lyrics");
const queue = document.getElementsByClassName("queue");

const qBtn = document.getElementById("qBtn");

lBtn.addEventListener("click", () => {
    lyrics[0].classList.remove("remHide");
    queue[0].classList.add("remHide");

    lBtn.style.borderBottom = "2px solid white";
    qBtn.style.borderBottom = "2px solid transparent";
});

qBtn.addEventListener("click", () => {
    lyrics[0].classList.add("remHide");
    queue[0].classList.remove("remHide");

    lBtn.style.borderBottom = "2px solid transparent";
    qBtn.style.borderBottom = "2px solid white";
});
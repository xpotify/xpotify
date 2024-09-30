// Animation for Pinned Playlists
const navBtnHm = document.querySelector(".navBtnHm");
let homeState = true;
const genreBtns = document.querySelector(".tomBtns");
const p = document.querySelectorAll(".playlists"); 
const win1 = document.querySelector(".window1");
const win2 = document.querySelector(".window2");
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
const queueBtn = document.getElementById("queueBtn");
const extraControls = document.getElementsByClassName("extraControlsDiv")
const window1 = document.getElementsByClassName("window1");
const lBtn = document.getElementById("lBtn");

let lStat = false;

extraControls[3].addEventListener("click", () => {
    if(lStat == false){
        genreBtn[0].classList.add("remHide");
        for(i=0; i < playlists.length; i++){
            playlists[i].classList.add("remHide");
        };
        extraControls[3].style.borderBottom = "2px solid rgba(255, 0, 116, 1)";
        window1[0].classList.remove("remHide");
        lyricsBtn.style.opacity = "100%";
        lBtn.style.borderBottom = "2px solid white";
        qBtn.style.borderBottom = "2px solid transparent";
        lyrics[0].classList.remove("remHide");
        queue[0].classList.add("remHide");
        lyricsBtn.dataset.isopen = true;
        navBtnHm.style.backgroundColor = "transparent";
        win2.classList.add("remHide");
        homeState = false;
        lStat = true;
    } else if(lStat == true && queueBtn.dataset.isopen == "true"){
        extraControls[3].style.borderBottom = "2px solid rgba(255, 0, 116, 1)";
        extraControls[4].style.borderBottom = "2px solid transparent";
        queueBtn.style.opacity = "55%";
        lyricsBtn.style.opacity = "100%";
        lBtn.style.borderBottom = "2px solid white";
        qBtn.style.borderBottom = "2px solid transparent";
        lyrics[0].classList.remove("remHide");
        queue[0].classList.add("remHide");
        lyricsBtn.dataset.isopen = true;
        queueBtn.dataset.isopen = false;
        navBtnHm.style.backgroundColor = "transparent";
        win2.classList.add("remHide");
        homeState = false;
        lStat = true;
    } else {
        genreBtn[0].classList.remove("remHide");
        for(i=0; i < playlists.length; i++){
            playlists[i].classList.remove("remHide");
        };
        extraControls[3].style.borderBottom = "2px solid transparent";
        lyricsBtn.style.opacity = "55%"
        lyricsBtn.dataset.isopen = false;
        window1[0].classList.add("remHide");
        navBtnHm.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        homeState = true;
        lStat = false;
    }
});


extraControls[4].addEventListener("click", () => {
    if(lStat == false){
        genreBtn[0].classList.add("remHide");
        for(i=0; i < playlists.length; i++){
            playlists[i].classList.add("remHide");
        };
        extraControls[4].style.borderBottom = "2px solid rgba(255, 0, 116, 1)";
        window1[0].classList.remove("remHide");
        queueBtn.style.opacity = "100%";
        queueBtn.dataset.isopen = true;
        lBtn.style.borderBottom = "2px solid transparent";
        qBtn.style.borderBottom = "2px solid white";
        lyrics[0].classList.add("remHide");
        queue[0].classList.remove("remHide");
        navBtnHm.style.backgroundColor = "transparent";
        win2.classList.add("remHide");
        homeState = false;
        lStat = true;
    } else if(lStat == true && lyricsBtn.dataset.isopen == "true"){
        extraControls[4].style.borderBottom = "2px solid rgba(255, 0, 116, 1)";
        extraControls[3].style.borderBottom = "2px solid transparent";
        queueBtn.style.opacity = "100%";
        lyricsBtn.style.opacity = "55%";
        lBtn.style.borderBottom = "2px solid transparent";
        qBtn.style.borderBottom = "2px solid white";
        lyrics[0].classList.add("remHide");
        queue[0].classList.remove("remHide");
        lyricsBtn.dataset.isopen = false;
        queueBtn.dataset.isopen = true;
        navBtnHm.style.backgroundColor = "transparent";
        win2.classList.add("remHide");
        homeState = false;
        lStat = true;
    } else {
        genreBtn[0].classList.remove("remHide");
        for(i=0; i < playlists.length; i++){
            playlists[i].classList.remove("remHide");
        };
        extraControls[4].style.borderBottom = "2px solid transparent";
        queueBtn.style.opacity = "55%"
        queueBtn.dataset.isopen = false;
        window1[0].classList.add("remHide");
        navBtnHm.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        homeState = true;
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

    extraControls[4].style.borderBottom = "2px solid transparent";
    extraControls[3].style.borderBottom = "2px solid rgba(255, 0, 116, 1)";
    
    queueBtn.style.opacity = "55%";
    lyricsBtn.style.opacity = "100%";
    
    lyricsBtn.dataset.isopen = true;
    queueBtn.dataset.isopen = false;
});

qBtn.addEventListener("click", () => {
    lyrics[0].classList.add("remHide");
    queue[0].classList.remove("remHide");

    lBtn.style.borderBottom = "2px solid transparent";
    qBtn.style.borderBottom = "2px solid white";
    
    extraControls[3].style.borderBottom = "2px solid transparent";
    extraControls[4].style.borderBottom = "2px solid rgba(255, 0, 116, 1)";
    
    queueBtn.style.opacity = "100%";
    lyricsBtn.style.opacity = "55%";
    
    lyricsBtn.dataset.isopen = false;
    queueBtn.dataset.isopen = true;
});


// home button
navBtnHm.addEventListener("click", () => {
    if(homeState == false){
        navBtnHm.classList.remove("remHide");
        genreBtns.classList.remove("remHide");
        for(x=0; x < p.length; x++){
            p[x].classList.remove("remHide");
        };
        win1.classList.add("remHide");
        win2.classList.add("remHide");
        navBtnHm.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
        extraControls[3].style.borderBottom = "2px solid transparent";
        extraControls[4].style.borderBottom = "2px solid transparent";
    
        queueBtn.style.opacity = "55%";
        lyricsBtn.style.opacity = "55%";

        lStat = false;
        homeState = true;
    } else {
        // Do nothing!
    }
});
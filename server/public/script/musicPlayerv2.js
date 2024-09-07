const playpause = document.getElementById("playpause");
const audio = document.getElementById("audio");
const progressBar = document.getElementsByClassName("progressBar");
const trackDuration = document.getElementsByClassName("trackDuration");
const trackCurrentTime = document.getElementsByClassName("currentTime");
const audioSeeker = document.getElementById("audioSeeker");

const calculateTime = (s) => {
    let mins = Math.floor(s/60);
    let secs = Math.floor(s % 60);
    let finMins = mins < 10 ? `0${mins}` : `${mins}`;
    let finSecs = secs < 10 ? `0${secs}` : `${secs}`;
    
    return (`${finMins}:${finSecs}`);
};

if (audio.readyState > 0) {
    trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
} else {
    audio.addEventListener('loadedmetadata', () => {
        trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
    });
}

audio.addEventListener("loadedmetadata", () => {
    trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
});

audio.volume = 0.04;
volSlider.value = audio.volume*100;

playpause.addEventListener("click", () => {
    if(audio.paused == false){
        audio.pause();
        playpause.src = "/icons/playyyy.svg"
    } else if(audio.paused == true){
        audio.play();
        playpause.src = "/icons/pausee.svg"
    };
});

audio.addEventListener("timeupdate", () => {
    const ticks = Math.floor(audio.duration);
    const increment = (1920/ticks)/1920*100;
    const increment2 = (1920/ticks);
    progressBar[0].style.width = `${audio.currentTime * increment}%`;
    audioSeeker.value = audio.currentTime * increment2;
    trackCurrentTime[0].innerText = `${calculateTime(audio.currentTime)}`;
});

volSlider.addEventListener("input", () => {
    audio.volume = (volSlider.value/100);
});

audioSeeker.addEventListener("change", () => {
    const ticks = audio.duration;
    const val = (1920/ticks);
    audio.currentTime = (audioSeeker.value/val);
});

audioSeeker.addEventListener("input", () => {
    const ticks = audio.duration;
    const val = (1920/ticks);
    progressBar[0].style.width = (audioSeeker.value/val) * (val/audioSeeker.value) *100;
});

// Volume mute/unmute
let stat = 0;

speaker.addEventListener("click", () => {
    if(stat == 0){
        audio.volume = 0;
        stat = 1;
        speaker.src = "/icons/mutedSpeaker.svg";
        volSlider.value = 0;
    } else if(stat == 1){
        audio.volume = 0.5;
        stat = 0;
        speaker.src = "/icons/speakerr.svg"
        volSlider.value = 100
    }
});

// Main Controls

let q = [
    {
        "trackName" : "Guy For That (Feat. Luke Combs)",
        "trackArtists" : [ 
            {
                "artistName" : "Post Malone"
            },
            {
                "artistName" : "Luke Combs"
            }
        ],
        "trackCoverImage" : "https://i.scdn.co/image/ab67616d0000b27340f1c739f1afe06578b62515",
        "trackSourcePath" : "5crxqqibcvoOQQgg4HjAFQ.mp3"
    },
    {
        "trackName" : "I Had Some Help (Feat. Morgan Wallen)",
        "trackArtists" : [ 
            {
                "artistName" : "Post Malone"
            },
            {
                "artistName" : "Morgan Wallen"
            }
        ],
        "trackCoverImage" : "https://i.scdn.co/image/ab67616d0000b27397306976e3eb8aad53b754eb",
        "trackSourcePath" : "7221xIgOnuakPdLqT0F3nP.mp3"
    },
    {
        "trackName" : "Worst Way",
        "trackArtists" : [ 
            {
                "artistName" : "Riley Green"
            },
            {
                "artistName" : "Riley Green"
            }
        ],
        "trackCoverImage" : "https://i.scdn.co/image/ab67616d000048513e3cacc30688b39ffed26334",
        "trackSourcePath" : "1osfLqL6L2iQsirRf83ded.mp3"
    }
];

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const trackArtists = document.getElementsByClassName("trackArtists");
const trackName = document.getElementsByClassName("trackName");
const trackSmallCoverImage = document.getElementById("trackSmallCoverImg");
const trackLargeCoverImage = document.getElementById("trackLargeCoverImg");

window.addEventListener("load", () => {
    trackArtists[0].innerText = `${q[0].trackArtists[0].artistName} & ${q[0].trackArtists[1].artistName}`;
    trackName[0].innerText = `${q[0].trackName}`;
    trackSmallCoverImage.src = `${q[0].trackCoverImage}`;
    trackLargeCoverImage.src = `${q[0].trackCoverImage}`;
    audio.src = `songs/${q[0].trackSourcePath}`;
    trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
});
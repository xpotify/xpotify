const playpause = document.getElementById("playpause");
const audio = document.getElementById("audio");
const progressBar = document.getElementsByClassName("progressBar");
const trackDuration = document.getElementsByClassName("trackDuration");
const trackCurrentTime = document.getElementsByClassName("currentTime");
const audioSeeker = document.getElementById("audioSeeker");
const siteTitle = document.getElementById("siteTitle");

q2 = [
    {
        "id": "4WtllVoPahHbtOGnLvS8Wk",
        "trackName": "Indifferent",
        "duration": 176022,
        "calcDuration": "02:56",
        "album": {
            "id": "7nKCQbT5TOu7AAug3vlRLM",
            "name": "Indifferent",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b273bc55c4df2af97f879beba837",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e02bc55c4df2af97f879beba837",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d00004851bc55c4df2af97f879beba837",
                    "width": 64
                }
            ]
        },
        "artists": [
            {
                "externalURL": {
                    "spotify": "https://open.spotify.com/artist/5Ppie0uPnbnvGBYRwYmlt0"
                },
                "id": "5Ppie0uPnbnvGBYRwYmlt0",
                "name": "Megan Moroney",
                "type": "artist",
                "uri": "spotify:artist:5Ppie0uPnbnvGBYRwYmlt0"
            }
        ],
        "audioSrcPath": "4WtllVoPahHbtOGnLvS8Wk.mp3"
    },
    {
        "id": "1osfLqL6L2iQsirRf83ded",
        "trackName": "Worst Way",
        "duration": 220558,
        "calcDuration": "03:40",
        "album": {
            "id": "1iv2nD5tn753NFkDY79Tb7",
            "name": "Way Out Here",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b2733e3cacc30688b39ffed26334",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e023e3cacc30688b39ffed26334",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d000048513e3cacc30688b39ffed26334",
                    "width": 64
                }
            ]
        },
        "artists": [
            {
                "externalURL": {
                    "spotify": "https://open.spotify.com/artist/2QMsj4XJ7ne2hojxt6v5eb"
                },
                "id": "2QMsj4XJ7ne2hojxt6v5eb",
                "name": "Riley Green",
                "type": "artist",
                "uri": "spotify:artist:2QMsj4XJ7ne2hojxt6v5eb"
            }
        ],
        "audioSrcPath": "1osfLqL6L2iQsirRf83ded.mp3"
    }
];


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

audio.volume = 1;
volSlider.value = audio.volume*100;

playpause.addEventListener("click", () => {
    if(audio.paused == false){
        siteTitle.innerText = "Home"
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
    siteTitle.innerText = `${q2[cp].trackName} - ${q2[cp].artists[0].name}`;
    // console.log("timeupdated!");
    // console.log(audioSeeker.value);
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
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const trackArtists = document.getElementsByClassName("trackArtists");
const trackName = document.getElementsByClassName("trackName");
const trackSmallCoverImage = document.getElementsByClassName("trackSmallCoverImg");
const trackLargeCoverImage = document.getElementById("trackLargeCoverImg");

window.addEventListener("load", () => {
    trackArtists[0].innerText = `${q2[0].artists[0].name}`;
    trackName[0].innerText = `${q2[0].trackName}`;
    trackSmallCoverImage[0].src = `${q2[0].album.images[0].url}`;
    trackSmallCoverImage[1].src = `${q2[0].album.images[0].url}`;
    trackLargeCoverImage.src = `${q2[0].album.images[0].url}`;
    audio.src = `songs/${q2[0].audioSrcPath}`;
    trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
    audio.currentTime = 0;
    audioSeeker.value = 0;
});

let cp = 0;
audioSeeker.value = 0;

prev.addEventListener("click", () => {
    if(cp == 0){
        trackArtists[0].innerText = `${q2[q2.length - 1].artists[0].name} `;
        trackName[0].innerText = `${q2[q2.length - 1].trackName}`;
        trackSmallCoverImage[0].src = `${q2[q2.length - 1].album.images[0].url}`;
        trackSmallCoverImage[1].src = `${q2[q2.length - 1].album.images[0].url}`;
        trackLargeCoverImage.src = `${q2[q2.length - 1].album.images[0].url}`;
        audio.src = `songs/${q2[q2.length - 1].audioSrcPath}`;
        trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
        cp = q2.length - 1;
        audio.currentTime = 0;
        progressBar[0].style.width = `${0}%`;
        audioSeeker.value = 0;
        playpause.src = "/icons/pausee.svg"
        audio.play();
    } else {
        trackArtists[0].innerText = `${q2[cp - 1].artists[0].name}`;
        trackName[0].innerText = `${q2[cp - 1].trackName}`;
        trackSmallCoverImage[0].src = `${q2[cp - 1].album.images[0].url}`;
        trackSmallCoverImage[1].src = `${q2[cp - 1].album.images[0].url}`;
        trackLargeCoverImage.src = `${q2[cp - 1].album.images[0].url}`;
        audio.src = `songs/${q2[cp - 1].audioSrcPath}`;
        trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
        cp = cp - 1;
        audio.currentTime = 0;
        progressBar[0].style.width = `${0}%`;
        audioSeeker.value = 0;
        playpause.src = "/icons/pausee.svg"
        audio.play();
    }
});

next.addEventListener("click", () => {
    if(cp == (q2.length - 1)){
        trackArtists[0].innerText = `${q2[0].artists[0].name}`;
        trackName[0].innerText = `${q2[0].trackName}`;
        trackSmallCoverImage[0].src = `${q2[0].album.images[0].url}`;
        trackSmallCoverImage[1].src = `${q2[0].album.images[0].url}`;
        trackLargeCoverImage.src = `${q2[0].album.images[0].url}`;
        audio.src = `songs/${q2[0].audioSrcPath}`;
        trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
        cp = 0;
        audio.currentTime = 0;
        progressBar[0].style.width = `${0}%`;
        audioSeeker.value = 0;
        playpause.src = "/icons/pausee.svg"
        audio.play();
    } else {
        trackArtists[0].innerText = `${q2[cp + 1].artists[0].name}`;
        trackName[0].innerText = `${q2[cp + 1].trackName}`;
        trackSmallCoverImage[0].src = `${q2[cp + 1].album.images[0].url}`;
        trackSmallCoverImage[1].src = `${q2[cp + 1].album.images[0].url}`;
        trackLargeCoverImage.src = `${q2[cp + 1].album.images[0].url}`;
        audio.src = `songs/${q2[cp + 1].audioSrcPath}`;
        trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
        cp = cp + 1;
        audio.currentTime = 0;
        progressBar[0].style.width = `${0}%`;
        audioSeeker.value = 0;
        playpause.src = "/icons/pausee.svg"
        audio.play();
    }
});

// Loop button
let loopStat = false;

const ecDiv = document.getElementsByClassName("extraControlsDiv");
const loopBtnIco = document.getElementById("loopBtn"); 

ecDiv[1].addEventListener("click", () => {
    if(loopStat == false){
        ecDiv[1].style.borderBottom = "2px solid rgba(255, 0, 116, 1)";
        loopBtnIco.style.opacity = "100%";
        audio.loop = true;
        loopStat = true;
    } else {
        ecDiv[1].style.borderBottom = "2px solid transparent";
        loopBtnIco.style.opacity = "65%";
        audio.loop = false;
        loopStat = false;
    }
});


audio.addEventListener("ended", () => {
    if(cp == (q2.length - 1)){
        trackArtists[0].innerText = `${q2[0].artists[0].name}`;
        trackName[0].innerText = `${q2[0].trackName}`;
        trackSmallCoverImage[0].src = `${q2[0].album.images[0].url}`;
        trackSmallCoverImage[1].src = `${q2[0].album.images[0].url}`;
        trackLargeCoverImage.src = `${q2[0].album.image[0].url}`;
        audio.src = `songs/${q2[0].audioSrcPath}`;
        trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
        cp = 0;
        audio.currentTime = 0;
        progressBar[0].style.width = `${0}%`;
        audioSeeker.value = 0;
        playpause.src = "/icons/pausee.svg"
        audio.play(); 
    } else {
        trackArtists[0].innerText = `${q2[cp + 1].artists[0].name}`;
        trackName[0].innerText = `${q2[cp + 1].trackName}`;
        trackSmallCoverImage[0].src = `${q2[cp + 1].album.images[0].url}`;
        trackSmallCoverImage[1].src = `${q2[cp + 1].album.images[0].url}`;
        trackLargeCoverImage.src = `${q2[cp + 1].album.images[0].url}`;
        audio.src = `songs/${q2[cp + 1].audioSrcPath}`;
        trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
        cp = cp + 1;
        audio.currentTime = 0;
        progressBar[0].style.width = `${0}%`;
        audioSeeker.value = 0;
        playpause.src = "/icons/pausee.svg"
        audio.play();
    }
});

// Shuffle functionality for MusicPlayer

const shuffleBtn = document.getElementById("shuffleBtn");

extraControls[5].addEventListener("click", () => {
    console.log("triggered!");
});

// feeding current playing playlist's tracks into window1 > queue

const qwindow = document.getElementsByClassName("qTrack");

for(i=0; i < qwindow.length; i++){
    qwindow[i].children[0].innerText = i;
    qwindow[i].children[1].children[0].src = q2[i].album.images[0].url;
    qwindow[i].children[2].innerText = q2[i].trackName;
};

// feeding tracks of fetched playlist into window2 > tracks
// const fp = [
//     {
//         "addedAt": "2023-03-16T10:58:37Z",
//         "isLocal": false,
//         "discNumber": 1,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 233397,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/47RyOrXqLydmsPrsVU7nTw",
//             "id": "47RyOrXqLydmsPrsVU7nTw",
//             "isLocal": false,
//             "name": "Колыбельная",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/25egsfoMlUTUKa6HVCS962",
//                 "id": "25egsfoMlUTUKa6HVCS962",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b273bb632eaa5f899433d036b2a4",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e02bb632eaa5f899433d036b2a4",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d00004851bb632eaa5f899433d036b2a4",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Колыбельная",
//                 "releaseDate": "2019-12-06",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 57
//         }
//     },
//     {
//         "addedAt": "2023-03-16T10:58:39Z",
//         "isLocal": false,
//         "discNumber": 2,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 205903,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/2n3qidzvO42pCcYS2yc1ZS",
//             "id": "2n3qidzvO42pCcYS2yc1ZS",
//             "isLocal": false,
//             "name": "Can't Buy Me Loving / La La La",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/3ZCr8OXgFR1M9YazSYlPAV",
//                 "id": "3ZCr8OXgFR1M9YazSYlPAV",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2731fa8a5726acefec54f7ff552",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e021fa8a5726acefec54f7ff552",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048511fa8a5726acefec54f7ff552",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Can't Buy Me Loving / La La La",
//                 "releaseDate": "2021-04-08",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 55
//         }
//     },
//     {
//         "addedAt": "2024-03-15T07:34:48Z",
//         "isLocal": false,
//         "discNumber": 3,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/3nD2JkW5w0HXX8I6AhVDar"
//                     },
//                     "id": "3nD2JkW5w0HXX8I6AhVDar",
//                     "name": "escape",
//                     "type": "artist",
//                     "uri": "spotify:artist:3nD2JkW5w0HXX8I6AhVDar"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 162785,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/1lHvN5tHUffp7gM9AzO0wO",
//             "id": "1lHvN5tHUffp7gM9AzO0wO",
//             "isLocal": false,
//             "name": "Цунами",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/3nD2JkW5w0HXX8I6AhVDar"
//                         },
//                         "id": "3nD2JkW5w0HXX8I6AhVDar",
//                         "name": "escape",
//                         "type": "artist",
//                         "uri": "spotify:artist:3nD2JkW5w0HXX8I6AhVDar"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/6pWdlOJdycYpq6tzaq6dJa",
//                 "id": "6pWdlOJdycYpq6tzaq6dJa",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2737f804001a3e7f645956b23d6",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e027f804001a3e7f645956b23d6",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048517f804001a3e7f645956b23d6",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Цунами",
//                 "releaseDate": "2020-02-05",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 46
//         }
//     },
//     {
//         "addedAt": "2023-03-16T10:58:40Z",
//         "isLocal": false,
//         "discNumber": 4,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/4J6A7DGmVEA4CXhTnCxxEd"
//                     },
//                     "id": "4J6A7DGmVEA4CXhTnCxxEd",
//                     "name": "Andro",
//                     "type": "artist",
//                     "uri": "spotify:artist:4J6A7DGmVEA4CXhTnCxxEd"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 159529,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/0pPMSxTHDxROblb7yID8Ar",
//             "id": "0pPMSxTHDxROblb7yID8Ar",
//             "isLocal": false,
//             "name": "Иса",
//             "trackNumber": 7,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/4J6A7DGmVEA4CXhTnCxxEd"
//                         },
//                         "id": "4J6A7DGmVEA4CXhTnCxxEd",
//                         "name": "Andro",
//                         "type": "artist",
//                         "uri": "spotify:artist:4J6A7DGmVEA4CXhTnCxxEd"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/0rVySoMzodX0SXGcSLHTVy",
//                 "id": "0rVySoMzodX0SXGcSLHTVy",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b273cc5bbae201a6df3c2d92130a",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e02cc5bbae201a6df3c2d92130a",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d00004851cc5bbae201a6df3c2d92130a",
//                         "width": 64
//                     }
//                 ],
//                 "name": "MOON FLAME",
//                 "releaseDate": "2019-08-22",
//                 "totalTracks": 9,
//                 "type": "album"
//             },
//             "popularity": 52
//         }
//     },
//     {
//         "addedAt": "2023-03-16T10:58:41Z",
//         "isLocal": false,
//         "discNumber": 5,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 204489,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/4KGq63QyNHWz44M5S6PWGo",
//             "id": "4KGq63QyNHWz44M5S6PWGo",
//             "isLocal": false,
//             "name": "это ли счастье?",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/6RIr3dE6hBSv7Y0l2e1gCZ",
//                 "id": "6RIr3dE6hBSv7Y0l2e1gCZ",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b273523c7fc2e25259153e4587c9",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e02523c7fc2e25259153e4587c9",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d00004851523c7fc2e25259153e4587c9",
//                         "width": 64
//                     }
//                 ],
//                 "name": "это ли счастье?",
//                 "releaseDate": "2019-04-19",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 61
//         }
//     },
//     {
//         "addedAt": "2023-03-16T10:58:44Z",
//         "isLocal": false,
//         "discNumber": 6,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/3nD2JkW5w0HXX8I6AhVDar"
//                     },
//                     "id": "3nD2JkW5w0HXX8I6AhVDar",
//                     "name": "escape",
//                     "type": "artist",
//                     "uri": "spotify:artist:3nD2JkW5w0HXX8I6AhVDar"
//                 },
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/5E8WmPx3HcFqAA2PLVFk3R"
//                     },
//                     "id": "5E8WmPx3HcFqAA2PLVFk3R",
//                     "name": "Даня Милохин",
//                     "type": "artist",
//                     "uri": "spotify:artist:5E8WmPx3HcFqAA2PLVFk3R"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 160138,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/0HpoU9wzx6lhK1jIa6cVU3",
//             "id": "0HpoU9wzx6lhK1jIa6cVU3",
//             "isLocal": false,
//             "name": "so low",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/3nD2JkW5w0HXX8I6AhVDar"
//                         },
//                         "id": "3nD2JkW5w0HXX8I6AhVDar",
//                         "name": "escape",
//                         "type": "artist",
//                         "uri": "spotify:artist:3nD2JkW5w0HXX8I6AhVDar"
//                     },
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/5E8WmPx3HcFqAA2PLVFk3R"
//                         },
//                         "id": "5E8WmPx3HcFqAA2PLVFk3R",
//                         "name": "Даня Милохин",
//                         "type": "artist",
//                         "uri": "spotify:artist:5E8WmPx3HcFqAA2PLVFk3R"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/5IhaaXrUJF0VczczOWdJV8",
//                 "id": "5IhaaXrUJF0VczczOWdJV8",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b273ce97085f21cb7a60554b2ae3",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e02ce97085f21cb7a60554b2ae3",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d00004851ce97085f21cb7a60554b2ae3",
//                         "width": 64
//                     }
//                 ],
//                 "name": "so low",
//                 "releaseDate": "2021-09-01",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 44
//         }
//     },
//     {
//         "addedAt": "2023-03-16T10:58:45Z",
//         "isLocal": false,
//         "discNumber": 7,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/2ISiyx4DLCMAMBCvPesCoq"
//                     },
//                     "id": "2ISiyx4DLCMAMBCvPesCoq",
//                     "name": "JONY",
//                     "type": "artist",
//                     "uri": "spotify:artist:2ISiyx4DLCMAMBCvPesCoq"
//                 },
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/6o7TsOGOEF5Mqpiz2KCyWE"
//                     },
//                     "id": "6o7TsOGOEF5Mqpiz2KCyWE",
//                     "name": "HammAli & Navai",
//                     "type": "artist",
//                     "uri": "spotify:artist:6o7TsOGOEF5Mqpiz2KCyWE"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 200689,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/3Q7rxsGtlabDw0yBTnDnR5",
//             "id": "3Q7rxsGtlabDw0yBTnDnR5",
//             "isLocal": false,
//             "name": "Без тебя я не я",
//             "trackNumber": 5,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/2ISiyx4DLCMAMBCvPesCoq"
//                         },
//                         "id": "2ISiyx4DLCMAMBCvPesCoq",
//                         "name": "JONY",
//                         "type": "artist",
//                         "uri": "spotify:artist:2ISiyx4DLCMAMBCvPesCoq"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/0NcthPhd70vrFBXmZw4U7Q",
//                 "id": "0NcthPhd70vrFBXmZw4U7Q",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b273fd5c3010f1c824a54e262f18",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e02fd5c3010f1c824a54e262f18",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d00004851fd5c3010f1c824a54e262f18",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Список твоих мыслей",
//                 "releaseDate": "2019-06-21",
//                 "totalTracks": 9,
//                 "type": "album"
//             },
//             "popularity": 62
//         }
//     },
//     {
//         "addedAt": "2023-03-16T10:58:46Z",
//         "isLocal": false,
//         "discNumber": 8,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 188362,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/5snCfoQbJ7S4cYB0K8XuJ4",
//             "id": "5snCfoQbJ7S4cYB0K8XuJ4",
//             "isLocal": false,
//             "name": "Детство",
//             "trackNumber": 9,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 65
//         }
//     },
//     {
//         "addedAt": "2023-03-16T10:59:51Z",
//         "isLocal": false,
//         "discNumber": 9,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/2ISiyx4DLCMAMBCvPesCoq"
//                     },
//                     "id": "2ISiyx4DLCMAMBCvPesCoq",
//                     "name": "JONY",
//                     "type": "artist",
//                     "uri": "spotify:artist:2ISiyx4DLCMAMBCvPesCoq"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 150329,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/4hyVrAsoKKjxAvQjPRt0ai",
//             "id": "4hyVrAsoKKjxAvQjPRt0ai",
//             "isLocal": false,
//             "name": "Love Your Voice",
//             "trackNumber": 2,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/2ISiyx4DLCMAMBCvPesCoq"
//                         },
//                         "id": "2ISiyx4DLCMAMBCvPesCoq",
//                         "name": "JONY",
//                         "type": "artist",
//                         "uri": "spotify:artist:2ISiyx4DLCMAMBCvPesCoq"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/0NcthPhd70vrFBXmZw4U7Q",
//                 "id": "0NcthPhd70vrFBXmZw4U7Q",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b273fd5c3010f1c824a54e262f18",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e02fd5c3010f1c824a54e262f18",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d00004851fd5c3010f1c824a54e262f18",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Список твоих мыслей",
//                 "releaseDate": "2019-06-21",
//                 "totalTracks": 9,
//                 "type": "album"
//             },
//             "popularity": 65
//         }
//     },
//     {
//         "addedAt": "2023-03-16T11:02:41Z",
//         "isLocal": false,
//         "discNumber": 10,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/00bSB1W8StvyZrtSDJ3R6y"
//                     },
//                     "id": "00bSB1W8StvyZrtSDJ3R6y",
//                     "name": "SUNAMI",
//                     "type": "artist",
//                     "uri": "spotify:artist:00bSB1W8StvyZrtSDJ3R6y"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 127595,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/0y9WhkkBEaGqG92vhYfg3V",
//             "id": "0y9WhkkBEaGqG92vhYfg3V",
//             "isLocal": false,
//             "name": "Под луной",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/00bSB1W8StvyZrtSDJ3R6y"
//                         },
//                         "id": "00bSB1W8StvyZrtSDJ3R6y",
//                         "name": "SUNAMI",
//                         "type": "artist",
//                         "uri": "spotify:artist:00bSB1W8StvyZrtSDJ3R6y"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/4xrO394K94BMzMxsMi8i5y",
//                 "id": "4xrO394K94BMzMxsMi8i5y",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b273076534cdcca7dacaf1332bdf",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e02076534cdcca7dacaf1332bdf",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d00004851076534cdcca7dacaf1332bdf",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Под луной",
//                 "releaseDate": "2021-01-26",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 42
//         }
//     },
//     {
//         "addedAt": "2023-06-14T21:20:14Z",
//         "isLocal": false,
//         "discNumber": 11,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/79hts1H3bhswabKZPnX9jB"
//                     },
//                     "id": "79hts1H3bhswabKZPnX9jB",
//                     "name": "Lil-K",
//                     "type": "artist",
//                     "uri": "spotify:artist:79hts1H3bhswabKZPnX9jB"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 184888,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/69eIYV80zISfItEDE0r0Ui",
//             "id": "69eIYV80zISfItEDE0r0Ui",
//             "isLocal": false,
//             "name": "My Love",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/79hts1H3bhswabKZPnX9jB"
//                         },
//                         "id": "79hts1H3bhswabKZPnX9jB",
//                         "name": "Lil-K",
//                         "type": "artist",
//                         "uri": "spotify:artist:79hts1H3bhswabKZPnX9jB"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/3oRk46p3WHxtf2mLt9lmmR",
//                 "id": "3oRk46p3WHxtf2mLt9lmmR",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b273a12ccf8e451307370b24f159",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e02a12ccf8e451307370b24f159",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d00004851a12ccf8e451307370b24f159",
//                         "width": 64
//                     }
//                 ],
//                 "name": "My Love",
//                 "releaseDate": "2022-12-19",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 52
//         }
//     },
//     {
//         "addedAt": "2024-03-31T21:15:24Z",
//         "isLocal": false,
//         "discNumber": 12,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 229062,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/6XNXPb83xCgHpsqyQFbjYq",
//             "id": "6XNXPb83xCgHpsqyQFbjYq",
//             "isLocal": false,
//             "name": "ДОМ",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/61yV6SdTwkfCa6Bt3Mctdr",
//                 "id": "61yV6SdTwkfCa6Bt3Mctdr",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b27371bbb185b8b2d3930315e8e8",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e0271bbb185b8b2d3930315e8e8",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d0000485171bbb185b8b2d3930315e8e8",
//                         "width": 64
//                     }
//                 ],
//                 "name": "ДОМ",
//                 "releaseDate": "2023-01-27",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 43
//         }
//     },
//     {
//         "addedAt": "2024-04-13T03:36:39Z",
//         "isLocal": false,
//         "discNumber": 13,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 203260,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/01bfGEk9QAfTky6HqqpWR9",
//             "id": "01bfGEk9QAfTky6HqqpWR9",
//             "isLocal": false,
//             "name": "Я люблю тебя",
//             "trackNumber": 17,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 59
//         }
//     },
//     {
//         "addedAt": "2024-04-13T03:36:41Z",
//         "isLocal": false,
//         "discNumber": 14,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 164465,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/3CqR2vov2QPd3akzvrBSKg",
//             "id": "3CqR2vov2QPd3akzvrBSKg",
//             "isLocal": false,
//             "name": "Которую любишь",
//             "trackNumber": 16,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 31
//         }
//     },
//     {
//         "addedAt": "2024-04-13T03:36:42Z",
//         "isLocal": false,
//         "discNumber": 15,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 230341,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/58OLgaQqdVuRQMAjRTppGW",
//             "id": "58OLgaQqdVuRQMAjRTppGW",
//             "isLocal": false,
//             "name": "wonderful",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/4OmHxZnWYTIFKqDpWO7SuT",
//                 "id": "4OmHxZnWYTIFKqDpWO7SuT",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b27330fffb512d624059038851f2",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e0230fffb512d624059038851f2",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d0000485130fffb512d624059038851f2",
//                         "width": 64
//                     }
//                 ],
//                 "name": "wonderful",
//                 "releaseDate": "2020-02-14",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 44
//         }
//     },
//     {
//         "addedAt": "2024-04-13T03:36:43Z",
//         "isLocal": false,
//         "discNumber": 16,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 252036,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/2iNKt6yQcfxcMuOMxnWynQ",
//             "id": "2iNKt6yQcfxcMuOMxnWynQ",
//             "isLocal": false,
//             "name": "Унесённые ветрами",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/2YhswaxobQNnlMiOUpHQEF",
//                 "id": "2YhswaxobQNnlMiOUpHQEF",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2735ca903b4962fa6ff113ace2b",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e025ca903b4962fa6ff113ace2b",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048515ca903b4962fa6ff113ace2b",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Унесённые ветрами",
//                 "releaseDate": "2021-07-29",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 27
//         }
//     },
//     {
//         "addedAt": "2024-04-13T03:36:44Z",
//         "isLocal": false,
//         "discNumber": 17,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 211000,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/1kOq2mh7uuOeculkL7d5Nb",
//             "id": "1kOq2mh7uuOeculkL7d5Nb",
//             "isLocal": false,
//             "name": "LUV",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "single",
//                 "spotifyURL": "https://open.spotify.com/album/5NhlHxxnU7T9rMYzL8Ntul",
//                 "id": "5NhlHxxnU7T9rMYzL8Ntul",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b273e18ab0f6990d2a857073343f",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e02e18ab0f6990d2a857073343f",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d00004851e18ab0f6990d2a857073343f",
//                         "width": 64
//                     }
//                 ],
//                 "name": "LUV",
//                 "releaseDate": "2022-04-14",
//                 "totalTracks": 1,
//                 "type": "album"
//             },
//             "popularity": 32
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 18,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 116417,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/3vvMs36oqK6rF8k46cYdKp",
//             "id": "3vvMs36oqK6rF8k46cYdKp",
//             "isLocal": false,
//             "name": "Что между нами",
//             "trackNumber": 1,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 41
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 19,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 148475,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/083Y96v81SSFsqRstymjWf",
//             "id": "083Y96v81SSFsqRstymjWf",
//             "isLocal": false,
//             "name": "Мосты",
//             "trackNumber": 2,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 48
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 20,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 },
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/3iLkPRuO7SvDTInp9WtIcD"
//                     },
//                     "id": "3iLkPRuO7SvDTInp9WtIcD",
//                     "name": "интакто",
//                     "type": "artist",
//                     "uri": "spotify:artist:3iLkPRuO7SvDTInp9WtIcD"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 264162,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/0aGGOUNZh9f5DHfvhDfHja",
//             "id": "0aGGOUNZh9f5DHfvhDfHja",
//             "isLocal": false,
//             "name": "Апрель (feat. Интакто)",
//             "trackNumber": 3,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 34
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 21,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 248358,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/2j6GgJ04voW8MG5zvLHyyA",
//             "id": "2j6GgJ04voW8MG5zvLHyyA",
//             "isLocal": false,
//             "name": "Было бы лето",
//             "trackNumber": 4,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 42
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 22,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 200765,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/21tTRofoXdyMJ5K31yX830",
//             "id": "21tTRofoXdyMJ5K31yX830",
//             "isLocal": false,
//             "name": "Вечера",
//             "trackNumber": 5,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 59
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 23,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 168397,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/5bgV0dvOWqZSCpTwV4iJ9x",
//             "id": "5bgV0dvOWqZSCpTwV4iJ9x",
//             "isLocal": false,
//             "name": "Где моя любимая",
//             "trackNumber": 6,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 32
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 24,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 226666,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/7oxa45S5NlLkcBCisUSuvt",
//             "id": "7oxa45S5NlLkcBCisUSuvt",
//             "isLocal": false,
//             "name": "Голубые глаза",
//             "trackNumber": 7,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 34
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 25,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 },
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/3iLkPRuO7SvDTInp9WtIcD"
//                     },
//                     "id": "3iLkPRuO7SvDTInp9WtIcD",
//                     "name": "интакто",
//                     "type": "artist",
//                     "uri": "spotify:artist:3iLkPRuO7SvDTInp9WtIcD"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 230000,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/4BB9agAoB7Mvn1yyOW7OTq",
//             "id": "4BB9agAoB7Mvn1yyOW7OTq",
//             "isLocal": false,
//             "name": "Наркотики и алкоголь (feat. Интакто)",
//             "trackNumber": 8,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 33
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 26,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 152554,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/3ff8xir10lOjGbbrf0Wyqe",
//             "id": "3ff8xir10lOjGbbrf0Wyqe",
//             "isLocal": false,
//             "name": "Просто друг мой",
//             "trackNumber": 10,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 29
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 27,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 266682,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/3Uw9S3GzefBFXj41seYzWi",
//             "id": "3Uw9S3GzefBFXj41seYzWi",
//             "isLocal": false,
//             "name": "Мама",
//             "trackNumber": 11,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 38
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 28,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 176273,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/43uwvprrSojA6VHFjlnwzs",
//             "id": "43uwvprrSojA6VHFjlnwzs",
//             "isLocal": false,
//             "name": "Скажи мне как ты любишь меня",
//             "trackNumber": 12,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 32
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 29,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 152542,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/3YYdvweWofzy2QrrSiWAIf",
//             "id": "3YYdvweWofzy2QrrSiWAIf",
//             "isLocal": false,
//             "name": "5 минут",
//             "trackNumber": 13,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 50
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 30,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 157924,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/6mWcutI23LKJ7tWVwo9ky8",
//             "id": "6mWcutI23LKJ7tWVwo9ky8",
//             "isLocal": false,
//             "name": "Солнце",
//             "trackNumber": 14,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 27
//         }
//     },
//     {
//         "addedAt": "2024-07-08T18:39:21Z",
//         "isLocal": false,
//         "discNumber": 31,
//         "track": {
//             "artists": [
//                 {
//                     "externalURL": {
//                         "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                     },
//                     "id": "0a3zDmrvmZcORfPeONPvfL",
//                     "name": "Rauf & Faik",
//                     "type": "artist",
//                     "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                 }
//             ],
//             "discNumber": 1,
//             "duration": 179942,
//             "explicit": false,
//             "spotifyURL": "https://open.spotify.com/track/1w76OwmOHmVBI6qygRJUmi",
//             "id": "1w76OwmOHmVBI6qygRJUmi",
//             "isLocal": false,
//             "name": "Я огонь ты вода",
//             "trackNumber": 15,
//             "type": "track",
//             "album": {
//                 "artists": [
//                     {
//                         "externalURL": {
//                             "spotify": "https://open.spotify.com/artist/0a3zDmrvmZcORfPeONPvfL"
//                         },
//                         "id": "0a3zDmrvmZcORfPeONPvfL",
//                         "name": "Rauf & Faik",
//                         "type": "artist",
//                         "uri": "spotify:artist:0a3zDmrvmZcORfPeONPvfL"
//                     }
//                 ],
//                 "albumType": "album",
//                 "spotifyURL": "https://open.spotify.com/album/4WK37rds5vKQcDwZUYQRCB",
//                 "id": "4WK37rds5vKQcDwZUYQRCB",
//                 "images": [
//                     {
//                         "height": 640,
//                         "url": "https://i.scdn.co/image/ab67616d0000b2736631d6c1af6973fbd055bc58",
//                         "width": 640
//                     },
//                     {
//                         "height": 300,
//                         "url": "https://i.scdn.co/image/ab67616d00001e026631d6c1af6973fbd055bc58",
//                         "width": 300
//                     },
//                     {
//                         "height": 64,
//                         "url": "https://i.scdn.co/image/ab67616d000048516631d6c1af6973fbd055bc58",
//                         "width": 64
//                     }
//                 ],
//                 "name": "Я люблю тебя",
//                 "releaseDate": "2018-09-28",
//                 "totalTracks": 17,
//                 "type": "album"
//             },
//             "popularity": 32
//         }
//     }
// ];

// const fpTrack = document.getElementsByClassName("fpTrack");

// for(i=0; i < fpTrack.length; i++){
//     fpTrack[i].children[0].innerText = fp[i].discNumber;
//     fpTrack[i].children[1].children[0].src = fp[i].track.album.images[1].url;
//     fpTrack[i].children[2].children[0].innerText = fp[i].track.name;
//     fpTrack[i].children[2].children[1].innerText = fp[i].track.artists[0].name;
//     fpTrack[i].children[3].innerText = calculateTime((fp[i].track.duration)/1000);
// };

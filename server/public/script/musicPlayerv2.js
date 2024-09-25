const playpause = document.getElementById("playpause");
const audio = document.getElementById("audio");
const progressBar = document.getElementsByClassName("progressBar");
const trackDuration = document.getElementsByClassName("trackDuration");
const trackCurrentTime = document.getElementsByClassName("currentTime");
const audioSeeker = document.getElementById("audioSeeker");
const siteTitle = document.getElementById("siteTitle");

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
    siteTitle.innerText = `${q2[cp].trackName} - ${q2[cp].artist.name}`;
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
        "trackCoverImage" : "https://i.scdn.co/image/ab67616d0000b2733e3cacc30688b39ffed26334",
        "trackSourcePath" : "1osfLqL6L2iQsirRf83ded.mp3"
    },
    {
        "trackName" : "Indifferent",
        "trackArtists" : [ 
            {
                "artistName" : "Megan Moroney"
            },
            {
                "artistName" : "Megan Moroney"
            }
        ],
        "trackCoverImage" : "https://i.scdn.co/image/ab67616d0000b273bc55c4df2af97f879beba837",
        "trackSourcePath" : "4WtllVoPahHbtOGnLvS8Wk.mp3"
    },
    {
        "trackName" : "Ain't No Love In Oklahoma (From Twisters: The Album)",
        "trackArtists" : [ 
            {
                "artistName" : "Luke Combs"
            },
            {
                "artistName" : "Luke Combs"
            }
        ],
        "trackCoverImage" : "https://i.scdn.co/image/ab67616d0000b27339808230102049beb62fdd7b",
        "trackSourcePath" : "6GG4yyk3UATdBfTHVgI8PB.mp3"
    },
    {
        "trackName" : "Darlin'",
        "trackArtists" : [ 
            {
                "artistName" : "Chase Mathew"
            },
            {
                "artistName" : "Chase Mathew"
            }
        ],
        "trackCoverImage" : "https://i.scdn.co/image/ab67616d0000b2730f9c8e314dbaab6bbcd7965c",
        "trackSourcePath" : "727x6SZXGF0LfU2vi3rjaH.mp3"
    },
    {
        "trackName" : "What He'll Never Have",
        "trackArtists" : [ 
            {
                "artistName" : "Dylan Scott"
            },
            {
                "artistName" : "Dylan Scott"
            }
        ],
        "trackCoverImage" : "https://i.scdn.co/image/ab67616d0000b273a1fdca7c34d610adba91d03e",
        "trackSourcePath" : "61SRKyox0R9jCzci4JXKBS.mp3"
    }
];

let q2 = [
    {
        "id": "4WtllVoPahHbtOGnLvS8Wk",
        "artist": {
            "id": "5Ppie0uPnbnvGBYRwYmlt0",
            "name": "Megan Moroney"
        },
        "trackName": "Indifferent",
        "audioSrcPath": "4WtllVoPahHbtOGnLvS8Wk.mp3",
        "album": {
            "name": "Indifferent",
            "id": "7nKCQbT5TOu7AAug3vlRLM",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b273bc55c4df2af97f879beba837"
            }
        }
    },
    {
        "id": "1osfLqL6L2iQsirRf83ded",
        "artist": {
            "id": "2QMsj4XJ7ne2hojxt6v5eb",
            "name": "Riley Green"
        },
        "trackName": "Worst Way",
        "audioSrcPath": "1osfLqL6L2iQsirRf83ded.mp3",
        "album": {
            "name": "Way Out Here",
            "id": "1iv2nD5tn753NFkDY79Tb7",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b2733e3cacc30688b39ffed26334"
            }
        }
    },
    {
        "id": "2FQrifJ1N335Ljm3TjTVVf",
        "artist": {
            "id": "3y2cIKLjiOlp1Np37WiUdH",
            "name": "Shaboozey"
        },
        "trackName": "A Bar Song (Tipsy)",
        "audioSrcPath": "2FQrifJ1N335Ljm3TjTVVf.mp3",
        "album": {
            "name": "A Bar Song (Tipsy)",
            "id": "6egBeCLeGITzGSo5VyRjwZ",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b27380d86d636244b72a3a1eede2"
            }
        }
    },
    {
        "id": "5crxqqibcvoOQQgg4HjAFQ",
        "artist": {
            "id": "246dkjvS1zLTtiykXe5h60",
            "name": "Post Malone,"
        },
        "trackName": "Guy For That (Feat. Luke Combs)",
        "audioSrcPath": "5crxqqibcvoOQQgg4HjAFQ.mp3",
        "album": {
            "name": "Guy For That",
            "id": "6w0ujcFPqoqOzgzYsUWYXJ",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b27340f1c739f1afe06578b62515"
            }
        }
    },
    {
        "id": "7221xIgOnuakPdLqT0F3nP",
        "artist": {
            "id": "246dkjvS1zLTtiykXe5h60",
            "name": "Post Malone,"
        },
        "trackName": "I Had Some Help (Feat. Morgan Wallen)",
        "audioSrcPath": "7221xIgOnuakPdLqT0F3nP.mp3",
        "album": {
            "name": "I Had Some Help",
            "id": "1woYXxyyxTQJ0E0AhZE6mj",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b27397306976e3eb8aad53b754eb"
            }
        }
    },
    {
        "id": "73KAidtqbDftZjy8AD0H04",
        "artist": {
            "id": "1Tie3AZgLQZqYEp8Fv4zOZ",
            "name": "Koe Wetzel,"
        },
        "trackName": "High Road (feat. Jessie Murph)",
        "audioSrcPath": "73KAidtqbDftZjy8AD0H04.mp3",
        "album": {
            "name": "High Road (feat. Jessie Murph)...",
            "id": "62NSHNGNQC2hXZKNuvF6pi",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b2732c44d76ea64d1b5876b44eb3"
            }
        }
    },
    {
        "id": "6GG4yyk3UATdBfTHVgI8PB",
        "artist": {
            "id": "718COspgdWOnwOFpJHRZHS",
            "name": "Luke Combs"
        },
        "trackName": "Ain't No Love In Oklahoma (From Twisters: The...",
        "audioSrcPath": "6GG4yyk3UATdBfTHVgI8PB.mp3",
        "album": {
            "name": "Ain't No Love In Oklahoma (Fro...",
            "id": "7x1eLsPizad7dHnqCGQODx",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b27339808230102049beb62fdd7b"
            }
        }
    },
    {
        "id": "61SRKyox0R9jCzci4JXKBS",
        "artist": {
            "id": "78YqeIji3mgAS2K1Maca6x",
            "name": "Dylan Scott"
        },
        "trackName": "What He'll Never Have",
        "audioSrcPath": "61SRKyox0R9jCzci4JXKBS.mp3",
        "album": {
            "name": "Livin' My Best Life (Still)",
            "id": "3B38AH4XMqDiI9W2Yd6mDT",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b273a1fdca7c34d610adba91d03e"
            }
        }
    },
    {
        "id": "727x6SZXGF0LfU2vi3rjaH",
        "artist": {
            "id": "7HTLVyjNf0VRxfIgNcfRRH",
            "name": "Chase Matthew"
        },
        "trackName": "Darlin'",
        "audioSrcPath": "727x6SZXGF0LfU2vi3rjaH.mp3",
        "album": {
            "name": "We All Grow Up",
            "id": "1XXkk3jAPfmW5jyRbRON7x",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b2730f9c8e314dbaab6bbcd7965c"
            }
        }
    },
    {
        "id": "0y5Ex8oQ8zCH5TQxHUy1Eo",
        "artist": {
            "id": "6BRxQ8cD3eqnrVj6WKDok8",
            "name": "Ella Langley,"
        },
        "trackName": "you look like you love me (feat. Riley Green)...",
        "audioSrcPath": "0y5Ex8oQ8zCH5TQxHUy1Eo.mp3",
        "album": {
            "name": "you look like you love me (fea...",
            "id": "69iNwop7x6VMhFMLEEtY1j",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b27398ec50a022a61a0286f0be1c"
            }
        }
    },
    {
        "id": "5iJKGpnFfvbjZJeAtwXfCj",
        "artist": {
            "id": "40ZNYROS4zLfyyBSs2PGe2",
            "name": "Zach Bryan"
        },
        "trackName": "28",
        "audioSrcPath": "5iJKGpnFfvbjZJeAtwXfCj.mp3",
        "album": {
            "name": "The Great American Bar Scene",
            "id": "1U0Z7QjSzlg3gMeUOuUldz",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b273647ad18a07e9e939e399e5a1"
            }
        }
    },
    {
        "id": "65M92JpTbAdHmTQm4jGaDa",
        "artist": {
            "id": "4YLtscXsxbVgi031ovDDdh",
            "name": "Chris Stapleton"
        },
        "trackName": "Think I'm In Love With You",
        "audioSrcPath": "65M92JpTbAdHmTQm4jGaDa.mp3",
        "album": {
            "name": "Think I’m In Love With You",
            "id": "52lLryGmbfkDOayypXEhhR",
            "image": {
                "url": "https://i.scdn.co/image/ab67616d0000b2733e87501009d6a9d7e78889e5"
            }
        }
    },
    {
            "id": "7BdlyzVvOqmwPH9dYtZfsx",
            "artist": {
                "id": "5b0j3TTNSKCByBq4rHYKvG",
                "name": "Promoting Sounds,"
            },
            "trackName": "Dead Eyes",
            "audioSrcPath": "7BdlyzVvOqmwPH9dYtZfsx.mp3",
            "album": {
                "name": "Dead Eyes",
                "id": "2Vi5izrZ6lL4tGgmp7nnOh",
                "image": {
                    "url": "https://i.scdn.co/image/ab67616d0000b273ce5a7b396b1f3c3a52e6cd11"
                }
            }
        },
        {
            "id": "5gxfVzzJyQ2rzXzxIgbR2T",
            "artist": {
                "id": "66q9TLB3xM6Yn0kIFiftpd",
                "name": "J+1,"
            },
            "trackName": "Red Skies",
            "audioSrcPath": "5gxfVzzJyQ2rzXzxIgbR2T.mp3",
            "album": {
                "name": "Red Skies",
                "id": "5PlB5oRjyYIW2FlqJ0kaFX",
                "image": {
                    "url": "https://i.scdn.co/image/ab67616d0000b273318ff4e98dd376040baaeccf"
                }
            }
        },
        {
            "id": "38T0tPVZHcPZyhtOcCP7pF",
            "artist": {
                "id": "7jVv8c5Fj3E9VhNjxT4snq",
                "name": "Lil Nas X"
            },
            "trackName": "STAR WALKIN' (League of Legends Worlds Anthem...",
            "audioSrcPath": "38T0tPVZHcPZyhtOcCP7pF.mp3",
            "album": {
                "name": "STAR WALKIN' (League of Legend...",
                "id": "0aIy6J8M9yHTnjtRu81Nr9",
                "image": {
                    "url": "https://i.scdn.co/image/ab67616d0000b27304cd9a1664fb4539a55643fe"
                }
            }
        },
        {
            "id": "0VpEX8ib3wE7u8NOw4szU6",
            "artist": {
                "id": "5Y8eJDj37KhaEeqbVO7Ag1",
                "name": "PRETTYMUCH"
            },
            "trackName": "Eyes Off You",
            "audioSrcPath": "0VpEX8ib3wE7u8NOw4szU6.mp3",
            "album": {
                "name": "Phases - EP",
                "id": "2eiprRNqzj5s3IPLvKsF6z",
                "image": {
                    "url": "https://i.scdn.co/image/ab67616d0000b273d46d93ee7fb0589ef6973c5d"
                }
            }
        },
        {
            "id": "4K0odcECsBvgzv9Lr9z4kd",
            "artist": {
                "id": "4uFZsG1vXrPcvnZ4iSQyrx",
                "name": "C418"
            },
            "trackName": "Aria Math",
            "audioSrcPath": "4K0odcECsBvgzv9Lr9z4kd.mp3",
            "album": {
                "name": "Minecraft - Volume Beta",
                "id": "7CYDRyFCKtAYJBSpfovLyX",
                "image": {
                    "url": "https://i.scdn.co/image/ab67616d0000b2734cf0b29eb06a92aa96acae64"
                }
            }
        }    
];

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const trackArtists = document.getElementsByClassName("trackArtists");
const trackName = document.getElementsByClassName("trackName");
const trackSmallCoverImage = document.getElementsByClassName("trackSmallCoverImg");
const trackLargeCoverImage = document.getElementById("trackLargeCoverImg");

window.addEventListener("load", () => {
    trackArtists[0].innerText = `${q2[0].artist.name}`;
    trackName[0].innerText = `${q2[0].trackName}`;
    trackSmallCoverImage[0].src = `${q2[0].album.image.url}`;
    trackSmallCoverImage[1].src = `${q2[0].album.image.url}`;
    trackLargeCoverImage.src = `${q2[0].album.image.url}`;
    audio.src = `songs/${q2[0].audioSrcPath}`;
    trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
    audio.currentTime = 0;
    audioSeeker.value = 0;
});

let cp = 0;
audioSeeker.value = 0;

prev.addEventListener("click", () => {
    if(cp == 0){
        trackArtists[0].innerText = `${q2[q2.length - 1].artist.name} `;
        trackName[0].innerText = `${q2[q2.length - 1].trackName}`;
        trackSmallCoverImage[0].src = `${q2[q2.length - 1].album.image.url}`;
        trackSmallCoverImage[1].src = `${q2[q2.length - 1].album.image.url}`;
        trackLargeCoverImage.src = `${q2[q2.length - 1].album.image.url}`;
        audio.src = `songs/${q2[q2.length - 1].audioSrcPath}`;
        trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
        cp = q2.length - 1;
        audio.currentTime = 0;
        progressBar[0].style.width = `${0}%`;
        audioSeeker.value = 0;
        playpause.src = "/icons/pausee.svg"
        audio.play();
    } else {
        trackArtists[0].innerText = `${q2[cp - 1].artist.name}`;
        trackName[0].innerText = `${q2[cp - 1].trackName}`;
        trackSmallCoverImage[0].src = `${q2[cp - 1].album.image.url}`;
        trackSmallCoverImage[1].src = `${q2[cp - 1].album.image.url}`;
        trackLargeCoverImage.src = `${q2[cp - 1].album.image.url}`;
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
        trackArtists[0].innerText = `${q2[0].artist.name}`;
        trackName[0].innerText = `${q2[0].trackName}`;
        trackSmallCoverImage[0].src = `${q2[0].album.image.url}`;
        trackSmallCoverImage[1].src = `${q2[0].album.image.url}`;
        trackLargeCoverImage.src = `${q2[0].album.image.url}`;
        audio.src = `songs/${q2[0].audioSrcPath}`;
        trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
        cp = 0;
        audio.currentTime = 0;
        progressBar[0].style.width = `${0}%`;
        audioSeeker.value = 0;
        playpause.src = "/icons/pausee.svg"
        audio.play();
    } else {
        trackArtists[0].innerText = `${q2[cp + 1].artist.name}`;
        trackName[0].innerText = `${q2[cp + 1].trackName}`;
        trackSmallCoverImage[0].src = `${q2[cp + 1].album.image.url}`;
        trackSmallCoverImage[1].src = `${q2[cp + 1].album.image.url}`;
        trackLargeCoverImage.src = `${q2[cp + 1].album.image.url}`;
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
        trackArtists[0].innerText = `${q2[0].artist.name}`;
        trackName[0].innerText = `${q2[0].trackName}`;
        trackSmallCoverImage[0].src = `${q2[0].album.image.url}`;
        trackSmallCoverImage[1].src = `${q2[0].album.image.url}`;
        trackLargeCoverImage.src = `${q2[0].album.image.url}`;
        audio.src = `songs/${q2[0].audioSrcPath}`;
        trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
        cp = 0;
        audio.currentTime = 0;
        progressBar[0].style.width = `${0}%`;
        audioSeeker.value = 0;
        playpause.src = "/icons/pausee.svg"
        audio.play(); 
    } else {
        trackArtists[0].innerText = `${q2[cp + 1].artist.name}`;
        trackName[0].innerText = `${q2[cp + 1].trackName}`;
        trackSmallCoverImage[0].src = `${q2[cp + 1].album.image.url}`;
        trackSmallCoverImage[1].src = `${q2[cp + 1].album.image.url}`;
        trackLargeCoverImage.src = `${q2[cp + 1].album.image.url}`;
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
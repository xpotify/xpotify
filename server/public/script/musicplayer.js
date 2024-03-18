const audio = document.querySelector("audio");
const durationContainer = document.getElementById("audDuration");
const audioSeeker = document.getElementById("audSeeker");
const currentTimeContainer = document.getElementById('audCurrentTime');
const audPlaystateBtn = document.getElementById('playPause'); 
const volSeeker = document.getElementById("volSeeker");
const nextBtn = document.getElementById("audNextBtn");
const prevBtn = document.getElementById("audPrevBtn");
const volMax = document.getElementById("audVolMax");
const volMute = document.getElementById("audVolMute");
const siteTitle = document.getElementById("siteTitle");
const songCoverImage = document.getElementById("songCoverImg");
const songName = document.getElementById("songName");
const songArtist = document.getElementById("songArtist");
const songSrc = ["/songs/test.mp3", "/songs/test2.mp3", "/songs/test3.mp3", "/songs/test4.mp3", "/songs/test5.mp3"];
const songMetaData = [
  {
    "id" : 0,
    "name" : "Faded",
    "artist" : "Alan Walker",
    "img" : "https://i.scdn.co/image/ab67616d00001e02a108e07c661f9fc54de9c43a"
  },
  {
    "id" : 1,
    "name" : "Stereo Love",
    "artist" : "Edward Maya",
    "img" : "https://i.scdn.co/image/ab67616d00001e028290cf8dbeade5d6807826a5"
  },
  {
    "id" : 2,
    "name" : "Unity",
    "artist" : "Alan Walker", 
    "img" : "https://i.scdn.co/image/ab67616d00001e025a498fcd005980fa948c04e4"
  },
  {
    "id" : 3,
    "name" : "Shakira",
    "artist" : "1nonly",
    "img" : "https://i.scdn.co/image/ab67616d00001e0203c58779dfc6029341086829"
  },
  {
    "id" : 4,
    "name" : "Shoot to Thrill",
    "artist" : "AC/DC",
    "img" : "https://i.scdn.co/image/ab67616d00001e02b56115c0e231fbf69d3205c6"
  }
];

var volValue = volSeeker.value;
let playState = "play";

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () =>{
    durationContainer.textContent = calculateTime(audio.duration);
};

audio.addEventListener('loadedmetadata', () =>{
  displayDuration(audio.duration);
});


const setSliderMax2 = () => {
  audioSeeker.max = Math.floor(audio.duration);
};

const setSliderMax = () => {
  audio.addEventListener('loadedmetadata', () => {
    audioSeeker.max = Math.floor(audio.duration);
  });
};

audioSeeker.addEventListener("input", () => {
    currentTimeContainer.textContent = calculateTime(audioSeeker.value);
});

if (audio.readyState > 0) {
  displayDuration();
  setSliderMax2();
} else {
  audio.addEventListener('loadedmetadata', () => {
    displayDuration();
    setSliderMax2();
  });
}

const whilePlaying = () => {
  audioSeeker.value = Math.floor(audio.currentTime);
  currentTimeContainer.textContent = calculateTime(audioSeeker.value);
};

const changePlayPause = (e) => {
  if(e == "play"){
    audPlaystateBtn.src = "/icons/pause.png";
  } else {
    audPlaystateBtn.src = "/icons/play.png"
  }
};

audPlaystateBtn.addEventListener('click', () => {
  if(playState === 'play') {
    changePlayPause('play');
    audio.play();
    audio.volume = 0.25;
    whilePlaying();
    playState = 'pause';
  } else {
    changePlayPause('pause');
    audio.pause();
    whilePlaying();
    playState = 'play';
  }
});

audioSeeker.addEventListener('change', () => {
  audio.currentTime = audioSeeker.value;
});

audio.addEventListener('timeupdate', () => {
  audioSeeker.value = Math.floor(audio.currentTime);
  currentTimeContainer.textContent = calculateTime(audioSeeker.value);
});

volSeeker.addEventListener('input', (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    volValue = volSeeker.value;
});

let i = 0;
let songId = 1;
const songLim = (songSrc.length - 1);

const changeSiteTitle = (e) => {
  siteTitle.textContent =  `${songMetaData[e].name} - ${songMetaData[e].artist}`;
};

const changeSongMetaData = (e) => {
  songCoverImage.src = songMetaData[e].img;
  songName.textContent = songMetaData[e].name;
  songArtist.textContent = songMetaData[e].artist;
};

nextBtn.addEventListener("click", () => {
  if(songId != songLim){
    audio.src = songSrc[(i+1)];
    i = i+1;
    songId = songId + 1;
    changeSiteTitle(i);
    changeSongMetaData(i);
    changePlayPause('play');
    displayDuration();
    setSliderMax();
    audio.play();
  } else {
    i = 0;
    songId = 1;
    audio.src = songSrc[i];
    changeSiteTitle(i);
    changeSongMetaData(i);
    changePlayPause('play');
    displayDuration();
    setSliderMax();
    audio.play();
  }
});

prevBtn.addEventListener("click", () => {
  if(songId == 1){
    audio.src = songSrc[songLim];
    i = songLim;
    songId = (songLim + 1);
    changeSiteTitle(i);
    changeSongMetaData(i);
    changePlayPause('play');
    displayDuration();
    setSliderMax();
    audio.play();
  } else if(songId != songLim){
    audio.src = songSrc[(i-1)];
    i = i-1;
    songId = songId - 1;
    changeSiteTitle(i);
    changeSongMetaData(i);
    changePlayPause('play');
    displayDuration();
    setSliderMax();
    audio.play();
  }
  else {
    i = 0;
    songId = 1;
    audio.src = songSrc[i];
    changeSiteTitle(i);
    changeSongMetaData(i);
    changePlayPause('play');
    displayDuration();
    setSliderMax();
    audio.play();
  }
});

volMax.addEventListener('click', () => {
  if(volSeeker.value == 100){
    volSeeker.value = volValue;
    audio.volume = volValue / 100;
  } else {
    audio.volume = 1;
    volSeeker.value = 100;
  }
});

volMute.addEventListener('click', () => {
  if(volSeeker.value == 0){
    audio.volume = volValue / 100;
    volSeeker.value = volValue;
  } else{
    audio.volume = 0; 
    volSeeker.value = 0;
  }
});

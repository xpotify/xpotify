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
const songName = document.getElementById("trackName");
const songArtist = document.getElementById("songArtist");
var volValue = volSeeker.value;
let playState = "play";
audio.volume = 0.25;

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

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

// prev and next 

const songMetaData = [
  {
    "id" : 0,
    "name" : "Faded",
    "artist" : "Alan Walker",
    "img" : "https://i.scdn.co/image/ab67616d00001e02a108e07c661f9fc54de9c43a",
    "src" : "/songs/test.mp3",
    "songId" : "698ItKASDavgwZ3WjaWjtz",
    "artistId" : "7vk5e3vY1uw9plTHJAMwjN"
  },
  {
    "id" : 1,
    "name" : "Stereo Love",
    "artist" : "Edward Maya",
    "img" : "https://i.scdn.co/image/ab67616d00001e028290cf8dbeade5d6807826a5",
    "src" : "/songs/test2.mp3",
    "songId" : "7f1sggVl4oDn9LZIliSt38",
    "artistId" : "6XwwFnewNgWp81MYMK8zLq"
  },
  {
    "id" : 2,
    "name" : "Unity",
    "artist" : "Alan Walker", 
    "img" : "https://i.scdn.co/image/ab67616d00001e025a498fcd005980fa948c04e4",
    "src" : "/songs/test3.mp3",
    "songId" : "3Os9onUOoxT6EP3kwiMRKA",
    "artistId" : "7vk5e3vY1uw9plTHJAMwjN"
  },
  {
    "id" : 3,
    "name" : "Shakira",
    "artist" : "1nonly",
    "img" : "https://i.scdn.co/image/ab67616d00001e0203c58779dfc6029341086829",
    "src" : "/songs/test4.mp3",
    "songId" : "1zCQXSnLkfXq3TzMLr6pWf",
    "artistId" : "3ZHU5AKrUmIPnCFfr82QER"
  },
  {
    "id" : 4,
    "name" : "Shoot to Thrill",
    "artist" : "AC/DC",
    "img" : "https://i.scdn.co/image/ab67616d00001e02b56115c0e231fbf69d3205c6",
    "src" : "/songs/test5.mp3",
    "songId" : "6GzCkTddOn1vSln1gbSr8y",
    "artistId" : "711MCceyCBcFnzjGY4Q7Un"
  }
];

let z = 0;
let songId = 0;
let songId2 = 1;
const songLim = (songMetaData.length);

const changeSiteTitle = (trackName, artistName) => {
  siteTitle.textContent =  `${trackName} - ${artistName}`;
};

const changeSongMetaData = (e) => {
  songCoverImage.src = songMetaData[e].img;
  songName.innerText = songMetaData[e].name;
  songName.dataset.id = songMetaData[e].songId;
  songArtist.innerText = songMetaData[e].artist;
  songArtist.dataset.artistid = songMetaData[e].artistId;
};

nextBtn.addEventListener("click", () => {
  if(songId2 != songLim){
    audio.src = songMetaData[(z+1)].src;
    console.log(z+1);
    changeSiteTitle(z+1);
    changeSongMetaData(z+1);
    changePlayPause('play');
    displayDuration();
    setSliderMax();
    audio.play();
    z = z+1;
    songId2 = songId2 + 1;
  } else if(songId2 == songLim){
    z = 0;
    songId2 = 1;
    audio.src = songMetaData[z].src;
    changeSiteTitle(z);
    changeSongMetaData(z);
    changePlayPause('play');
    displayDuration();
    setSliderMax();
    audio.play();
  } else {

  }
});

prevBtn.addEventListener("click", () => {
  if(songId == 0){
    audio.src = songMetaData[(songLim - 1)].src;
    z = (songLim -1);
    songId = (songLim - 1);
    changeSiteTitle(z);
    changeSongMetaData(z);
    changePlayPause('play');
    displayDuration();
    setSliderMax();
    audio.play();
  } else if(songId != songLim){
    console.log(z);
    audio.src = songMetaData[(z-1)].src;
    changeSiteTitle(z-1);
    changeSongMetaData(z-1);
    changePlayPause('play');
    displayDuration();
    setSliderMax();
    audio.play();
    z = z-1;    
    songId = songId - 1;
  }
  else {
    console.log(kek)
    z = 0;
    songId = 1;
    audio.src = songMetaData[z].src;
    changeSiteTitle(z);
    changeSongMetaData(z);
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


//v2 MusicPlayer

var queuedTracks = [];

const playTrack = async (track) => {
  audio.src = track.audioSrcPath;
  console.log(track.audioSrcPath);
  displayDuration();
  setSliderMax();
  audio.play();
};




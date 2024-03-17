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
var volValue = volSeeker.value;
let playState = "play";
const songSrc = ["/songs/test.mp3", "/songs/test2.mp3", "/songs/test3.mp3"];


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

const setSliderMax = () => {
    audioSeeker.max = Math.floor(audio.duration);
};

audioSeeker.addEventListener("input", () => {
    currentTimeContainer.textContent = calculateTime(audioSeeker.value);
});

if (audio.readyState > 0) {
  displayDuration();
  setSliderMax();
} else {
  audio.addEventListener('loadedmetadata', () => {
    displayDuration();
    setSliderMax();
  });
}

const whilePlaying = () => {
  audioSeeker.value = Math.floor(audio.currentTime);
  currentTimeContainer.textContent = calculateTime(audioSeeker.value);
}

audPlaystateBtn.addEventListener('click', () => {
  if(playState === 'play') {
    audio.play();
    audio.volume = 0.25;
    audPlaystateBtn.src = "/icons/pause.png"
    whilePlaying();
    playState = 'pause';
  } else {
    audio.pause();
    audPlaystateBtn.src = "/icons/play.png"
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

nextBtn.addEventListener("click", () => {
  if(songId != 3){
    audio.src = songSrc[(i+1)];
    i = i+1;
    songId = songId + 1;
    audio.play();
  } else {
    i = 0;
    songId = 1;
    audio.src = songSrc[i];
    audio.play();
  }
});

prevBtn.addEventListener("click", () => {
  if(songId != 1){
    audio.src = songSrc[(i-1)];
    i = i-1;
    songId = songId - 1;
    audio.play();
  } else if(songId == 1){
    audio.src = songSrc[2];
    i = 2;
    songId = 3;
    audio.play();
  } 
  else {
    i = 0;
    songId = 1;
    audio.src = songSrc[i];
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
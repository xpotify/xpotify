const playpause = document.getElementById("playpause");
const audio = document.getElementById("audio");
const progressBar = document.getElementsByClassName("progressBar");
const trackDuration = document.getElementsByClassName("trackDuration");
const trackCurrentTime = document.getElementsByClassName("currentTime");

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
    progressBar[0].style.width = `${audio.currentTime * increment}%`;
});

volSlider.addEventListener("input", () => {
    audio.volume = (volSlider.value/100);
});

const calculateTime = (s) => {
    let mins = Math.floor(s/60);
    let secs = Math.floor(s % 60);
    let finMins = mins < 10 ? `0${mins}` : `${mins}`;
    let finSecs = secs < 10 ? `0${secs}` : `${secs}`;
    
    return (`${finMins}:${finSecs}`);
};

audio.addEventListener("loadedmetadata", () => {
    trackDuration[0].innerText = `${calculateTime(audio.duration)}`;
});

audio.addEventListener("timeupdate", () => {
    trackCurrentTime[0].innerText = `${calculateTime(audio.currentTime)}`;
});



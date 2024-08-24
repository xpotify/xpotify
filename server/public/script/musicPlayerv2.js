const playpause = document.getElementById("playpause");
const audio = document.getElementById("audio");

playpause.addEventListener("click", () => {
    if(audio.paused == false){
        audio.pause();
        playpause.src = "/icons/playyyy.svg"
    } else if(audio.paused == true){
        audio.play();
        playpause.src = "/icons/pausee.svg"
    };
});

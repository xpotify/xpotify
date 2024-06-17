const loader = document.getElementById("preloader");
const webLoader = document.getElementById("webLoader");
const prMetric = document.getElementById("preloaderMetricIMG");

window.addEventListener("load", () => {
    webLoader.classList.add("hide");

    const greetMsg = document.getElementById("greetMsg");
    const greetImage = document.getElementById("greetImage");

    let date = new Date;
    let time = date.getHours();
    
    if(4 <= time && time < 12){
            greetMsg.innerText = "Good Morning,";
            greetImage.src = "/icons/Morning.png";
            greetImage.classList.toggle("morning");
    } else if(12 < time && time <= 18){
            greetMsg.innerText = "Good Afternoon,";
            greetImage.src = "/icons/sunset.png";
            greetImage.classList.toggle("sunset");
    } else if(18 < time && time < 24){
            greetMsg.innerText = "Good Evening,";
            greetImage.src = "/icons/moon.png";
            greetImage.classList.toggle("night");
    } else if(0 <= time && time < 4){
            greetMsg.innerText = "Good Evening!";
            greetImage.src = "/icons/moon.png";
            greetImage.classList.toggle("night");
    }
     else {
            console.log("Invalid Time.");
    }

    tabs.classList.remove("hide");
});
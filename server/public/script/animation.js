const image = document.getElementsByClassName("userPlaylistCover");
const btn = document.getElementsByClassName("playlistPlayButton");

for(i=0; i < image.length; i++){
    const x = i;
    image[i].addEventListener("mouseenter", () => {
        btn[x].classList.add("playBtn");
    });

    image[i].addEventListener("mouseleave", () => {
        btn[x].classList.remove("playBtn");
    });
};

// document.onclick = () => {
//     const opt = document.getElementById("playlistOptions");
//     if(opt.classList[1] == "hide"){
//         // do nothing
//     } else {
//         opt.classList.add("hide");
//         console.log(opt.classList);
//     }
// }
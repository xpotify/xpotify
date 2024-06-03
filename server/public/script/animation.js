const image = document.getElementsByClassName("userPlaylistCover");
const btn = document.getElementsByClassName("playlistPlayButton");

// for(i=0; i < image.length; i++){
//     console.log(i);
//     image[i].addEventListener("mouseenter", () => {
//         let z = i;
//         console.log(z);
//         btn[i].classList.add("playBtn");
//     });

//     image[i].addEventListener("mouseleave", () => {
//         btn[z].classList.remove("playBtn");
//     });
// };

image[0].addEventListener("mouseenter", () => {
    btn[0].classList.add("playBtn");
});

image[1].addEventListener("mouseenter", () => {
    btn[1].classList.add("playBtn");
});

image[2].addEventListener("mouseenter", () => {
    btn[2].classList.add("playBtn");
});

image[3].addEventListener("mouseenter", () => {
    btn[3].classList.add("playBtn");
});

image[4].addEventListener("mouseenter", () => {
    btn[4].classList.add("playBtn");
});

image[0].addEventListener("mouseleave", () => {
    btn[0].classList.remove("playBtn");
});

image[1].addEventListener("mouseleave", () => {
    btn[1].classList.remove("playBtn");
});

image[2].addEventListener("mouseleave", () => {
    btn[2].classList.remove("playBtn");
});

image[3].addEventListener("mouseleave", () => {
    btn[3].classList.remove("playBtn");
});

image[4].addEventListener("mouseleave", () => {
    btn[4].classList.remove("playBtn");
});


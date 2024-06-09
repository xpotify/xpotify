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

// image[0].addEventListener("mouseenter", () => {
//     btn[0].classList.add("playBtn");
// });

// image[1].addEventListener("mouseenter", () => {
//     btn[1].classList.add("playBtn");
// });

// image[2].addEventListener("mouseenter", () => {
//     btn[2].classList.add("playBtn");
// });

// image[3].addEventListener("mouseenter", () => {
//     btn[3].classList.add("playBtn");
// });

// image[4].addEventListener("mouseenter", () => {
//     btn[4].classList.add("playBtn");
// });

// image[5].addEventListener("mouseenter", () => {
//     btn[5].classList.add("playBtn");
// });

// image[6].addEventListener("mouseenter", () => {
//     btn[6].classList.add("playBtn");
// });

// image[7].addEventListener("mouseenter", () => {
//     btn[7].classList.add("playBtn");
// });

// image[8].addEventListener("mouseenter", () => {
//     btn[8].classList.add("playBtn");
// });

// image[9].addEventListener("mouseenter", () => {
//     btn[9].classList.add("playBtn");
// });

// image[0].addEventListener("mouseleave", () => {
//     btn[0].classList.remove("playBtn");
// });

// image[1].addEventListener("mouseleave", () => {
//     btn[1].classList.remove("playBtn");
// });

// image[2].addEventListener("mouseleave", () => {
//     btn[2].classList.remove("playBtn");
// });

// image[3].addEventListener("mouseleave", () => {
//     btn[3].classList.remove("playBtn");
// });

// image[4].addEventListener("mouseleave", () => {
//     btn[4].classList.remove("playBtn");
// });

// image[5].addEventListener("mouseleave", () => {
//     btn[5].classList.remove("playBtn");
// });

// image[6].addEventListener("mouseleave", () => {
//     btn[6].classList.remove("playBtn");
// });

// image[7].addEventListener("mouseleave", () => {
//     btn[7].classList.remove("playBtn");
// });

// image[8].addEventListener("mouseleave", () => {
//     btn[8].classList.remove("playBtn");
// });

// image[9].addEventListener("mouseleave", () => {
//     btn[9].classList.remove("playBtn");
// });


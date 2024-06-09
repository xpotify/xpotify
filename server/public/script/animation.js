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
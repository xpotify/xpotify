const lyricsTag = document.querySelectorAll("div a");
const lyricskek = document.querySelectorAll("div a span");
const lyricslol = document.querySelectorAll("div span");

for(i=0; i <= lyricsTag.length; i++){
    lyricsTag[i].removeAttribute("href");
    lyricsTag[i].removeAttribute("class");
};

for(i=0; i <= lyricskek.length; i++){
    lyricskek[i].removeAttribute("style");
    lyricskek[i].removeAttribute("class");
};

for(i=0; i <= lyricslol.length; i++){
    lyricslol[i].removeAttribute("style");
    lyricslol[i].removeAttribute("class");
};
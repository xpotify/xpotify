const artistTab = document.getElementById("artistTabs");
const tabs = document.getElementById("tabs");
const songTabs = document.getElementById("songsTabs");
const albumTabs = document.getElementById("albumTabs");
const lyricsTabs = document.getElementById("lyricsTab");
const playlistTabs = document.getElementById("playlistTabs");
const Loader = document.getElementById("preloader");

const showArtistTab = async () => {
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        artistTab.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        Loader.classList.remove("hide");
        
        var artistQuery = document.getElementById("songArtist").innerText;
        var artist = await fetchArtist(artistQuery);
        var artistId = artist.id;
        var artistTopTracks = await fetchArtistTopTracks(artistId);
        
        if(artist && artistTopTracks){
                let artistName = document.getElementById("artistName");
                let artistVerification = document.getElementById("artistVer");
                let artistFollowers = document.getElementById("artistFollowers");
                let artistTracks = document.getElementsByClassName("artistTopTracks");
                let artistTracksNum = document.getElementsByClassName("songNum");
                let artistTracksImg = document.getElementsByClassName("artistTrackImg");

                artistName.innerText = artist.name;
                artistFollowers.innerText = `${artist.totalFollowers} total followers`;

                if(artist.popularity > 50){
                        artistVerification.style.visibility = "visible";
                } else {
                        artistVerification.style.visibility = "hidden";
                }

                for(i=0; i < artistTracks.length; i++){
                        artistTracksNum[i].innerText = `${artistTopTracks[i].id}`;
                        artistTracksImg[i].src = artistTopTracks[i].album.img[2].url;
                        artistTracks[i].children[2].innerText = artistTopTracks[i].name;
                        // artistTracks[i].children[3]
                        artistTracks[i].children[4].innerText = calculateTime((artistTopTracks[i].duration)/1000);
                        artistTracks[i].children[5].innerText = artistTopTracks[i].album.name;
                }

        } else {
                console.log("artist doesnt exist!");
        }

        Loader.classList.add("hide");
        artistTab.classList.remove("hide");
};

const showList = () => {
        tabs.classList.add("hide");
        artistTab.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.remove("hide");    
};

const returnToHome = () => {
        artistTab.classList.add("hide");
        tabs.classList.remove("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
};

const showSongTab = async () => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        Loader.classList.remove("hide");

        const query = document.getElementById("player");
        const song = await getTrack("4KGq63QyNHWz44M5S6PWGo");
        const songType = document.getElementById("songType");
        const songName = document.getElementById("songName");
        const songArtist = document.getElementById("songArtist");
        const songAlbumImage = document.getElementById("songAlbumImage");
        const songImage = document.getElementsByClassName("songImage");
        const songTitle = document.getElementsByClassName("songTitle");
        const songDuration = document.getElementsByClassName("songDuration");
        const songAlbum = document.getElementsByClassName("songAlbum");

        songType.innerText = song.type;
        songName.innerText = song.name;
        songArtist.innerText = song.artists[0].name;
        songAlbumImage.src = song.album.images[1].url;
        songImage.src = song.album.images[2].url;
        songTitle.innerText = song.name;
        songDuration.innerText = calculateTime((song.duration)/1000)
        songAlbum.innerText = song.album.name;
        // songAlbum.dataset.albumid = song.album.id;

        Loader.classList.add("hide");
        songTabs.classList.remove("hide");
        // console.log(song);

};

const showAlbumTab = () => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.remove("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
};

const showLyricsTab = () => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.remove("hide");
        playlistTabs.classList.add("hide");
};
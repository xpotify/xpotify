const artistTab = document.getElementById("artistTabs");
const tabs = document.getElementById("tabs");
const songTabs = document.getElementById("songsTabs");
const albumTabs = document.getElementById("albumTabs");
const lyricsTabs = document.getElementById("lyricsTab");
const playlistTabs = document.getElementById("playlistTabs");
const Loader = document.getElementById("preloader");
// import { extractColors } from 'extract-colors'

function getColor(imageElement, ratio){
        const canvas = document.createElement("canvas");
        
        let width = canvas.width = imageElement.width;
        let height = canvas.height = imageElement.height;
        
        const context = canvas.getContext('2d');
        context.drawImage(imageElement, 0,0);
        
        let data, length;
        let i = -4, count = 0;
        
        try{
          data = context.getImageData(0,0, width, height);
          length = data.data.length;
        } catch(err){
          console.log(err);
          return{
            R: 0,
            G: 0,
            B: 0
          }
        }
        
        let R,G,B;
        
        R = G = B = 0;
        
        while((i += ratio * 2) < length){
          ++count
          
          R += data.data[i]+50;
          G += data.data[i + 1]+50;
          B += data.data[i + 2]+50;
          
          return {
            R,
            G,
            B
          }
        }
        
};

const showArtistTab = async (id) => {
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        artistTab.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        Loader.classList.remove("hide");
        
        var artistQuery = document.getElementById("songArtist").innerText;
        var artist = await fetchArtist(id);
        // var artistId = artist.id;
        var artistTopTracks = await fetchArtistTopTracks(id);
        const artistMusicContainer = document.getElementById("songsCon");
        const artistMusic = document.querySelectorAll(".artistTopTracks");
        
        if(artist && artistTopTracks){
                let artistName = document.getElementById("artistName");
                let artistVerification = document.getElementById("artistVer");
                let artistFollowers = document.getElementById("artistFollowers");
                let artistTracks = document.getElementsByClassName("artistTopTracks");
                let artistTracksNum = document.getElementsByClassName("songNum");
                let artistTracksImg = document.getElementsByClassName("artistTrackImg");

                artistName.innerText = artist.name;
                artistFollowers.innerText = `${artist.totalFollowers.toLocaleString()} total followers`;

                if(artist.popularity > 50){
                        artistVerification.style.visibility = "visible";
                } else {
                        artistVerification.style.visibility = "hidden";
                }

                if(artistMusic.length > 0){
                        artistMusic.forEach(el => el.remove());
                } else {
                        // do nothing
                }

                for(i=0; i < (artistTopTracks.length - 5); i++){
                        let div1 = document.createElement('div');
                        div1.className = "songs artistTopTracks";
                        let span1 = document.createElement('span');
                        span1.className = "songNum";
                        span1.innerHTML = `${artistTopTracks[i].id}`;
                        let span2 = document.createElement('span');
                        span2.className = "songImage";
                        let image = document.createElement('img');
                        image.src = `${artistTopTracks[i].album.img[2].url}`;
                        let div2 = document.createElement('div');
                        div2.className = "songTitleDiv2";
                        let div3 = document.createElement("div");
                        div3.className = "songTitle";
                        div3.innerHTML = `${artistTopTracks[i].name}`;
                        div3.dataset.id = `${artistTopTracks[i].songId}`;
                        let span3 = document.createElement('span');
                        let div4 = document.createElement("div");
                        div4.className = "songArtists";
                        span3.className = "songDuration";
                        span3.innerHTML = `${calculateTime((artistTopTracks[i].duration)/1000)}`;
                        let span4 = document.createElement('span');
                        span4.className = "songAlbum";
                        span4.innerText = `${(artistTopTracks[i].album.name).slice(0, 25) + "..."}`;
                        span4.dataset.id = `${(artistTopTracks[i].album.id)}`;

                        div3.addEventListener("click", () => {
                                showSongTab(div3.dataset.id);
                        });

                        span4.addEventListener("click", () => {
                                showAlbumTab(span4.dataset.id);
                        });
                                                
                        if(artistTopTracks[i].artists.length > 1){
                                for(x=0; x < artistTopTracks[i].artists.length; x++){
                                        let div = document.createElement('div');
                                        div.className = "songArtist";
                                        div.setAttribute("data-id", `${artistTopTracks[i].artists[x].id}`);

                                        if(x == (artistTopTracks[i].artists.length - 1)){
                                                div.innerHTML = `${artistTopTracks[i].artists[x].name}`;
                                        } else {
                                                div.innerHTML = `${artistTopTracks[i].artists[x].name}, `; 
                                        }
                                                                
                                        div.addEventListener("click", async () => {
                                                let id = div.dataset.id;
                                                showArtistTab(id);
                                        });
                                        div4.appendChild(div);
                                };
                        } else {
                                let div = document.createElement('div');
                                div.className = "songArtist";                                                
                                div.setAttribute("data-id", `${artistTopTracks[i].artists[0].id}`);
                                                        
                                div.innerHTML = `${artistTopTracks[i].artists[0].name}`;

                                div.addEventListener("click", async () => {
                                        let id = div.dataset.id;
                                        showArtistTab(id);
                                });
                                div4.appendChild(div);
                        }

                        span2.appendChild(image);
                        div1.appendChild(span1);
                        div1.appendChild(span2);
                        div1.appendChild(div2);
                        div2.appendChild(div3);
                        div2.appendChild(div4);
                        div1.appendChild(span3);
                        div1.appendChild(span4);

                        artistMusicContainer.appendChild(div1);
                }

                // for(i=0; i < artistMusic.length; i++){
                //         artistMusic[-1].classList.add("hide");
                // }
                // for(i=0; i < artistTracks.length; i++){
                //         artistTracksNum[i].innerText = `${artistTopTracks[i].id}`;
                //         artistTracksImg[i].src = artistTopTracks[i].album.img[2].url;
                //         artistTracks[i].children[2].innerText = artistTopTracks[i].name;
                //         // artistTracks[i].children[3]
                //         artistTracks[i].children[3].innerText = calculateTime((artistTopTracks[i].duration)/1000);
                //         artistTracks[i].children[4].innerText = artistTopTracks[i].album.name;
                // }


        } else {
                console.log("artist doesnt exist!");
        }

        artistTab.classList.remove("hide");
        Loader.classList.add("hide");
};

const showPlaylist = async (id) => {
        tabs.classList.add("hide");
        artistTab.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        Loader.classList.remove("hide");  

        // const src = "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848c1d9d1eae3a41255542bef0";

        // extractColors(src).then(console.log).catch(console.error);
        
        const playlistName = document.getElementById("playlistName");
        const playlistOwner = document.getElementById("playlistOwner");
        const playlistImage = document.getElementById("playlistImage");
        const playlistTracksContainer = document.getElementById("playlistMusic");
        const playlistNoMusic = document.getElementById("playlistNoSongs");
        
        const playlistMetadata = await fetchPlaylist(id);
        const playlistTracks = await fetchPlaylistTracks(id);

        playlistName.innerText = `${playlistMetadata.name}`;
        playlistImage.src = playlistMetadata.image;
        playlistOwner.innerText = playlistMetadata.owner.name;
        playlistNoMusic.innerText = playlistMetadata.totalTracks + " songs";
        // console.log(this.dataset.playlistid);

        const playlistMusicTracks = document.querySelectorAll(".playlistMusicTracks");
        if(playlistTracks){
                if(playlistMusicTracks.length > 0){
                        playlistMusicTracks.forEach(el => el.remove());
                        for(i=0; i < playlistTracks.length; i++){
                                let div1 = document.createElement('div');
                                div1.className = "songs playlistMusicTracks";
                                let span1 = document.createElement('span');
                                span1.className = "songNum";
                                span1.innerHTML = `${playlistTracks[i].discNumber}`;
                                let span2 = document.createElement('span');
                                span2.className = "songImage";
                                let image = document.createElement('img');
                                image.src = `${playlistTracks[i].track.album.images[2].url}`;
                                let div2 = document.createElement('div');
                                div2.className = "songTitleDiv2";
                                let div3 = document.createElement("div");
                                div3.className = "songTitle";
                                div3.innerHTML = `${playlistTracks[i].track.name}`;
                                div3.dataset.id = `${playlistTracks[i].track.id}`;
                                let span3 = document.createElement('span');
                                let div4 = document.createElement("div");
                                div4.className = "songArtists";
                                span3.className = "songDuration";
                                span3.innerHTML = `${calculateTime((playlistTracks[i].track.duration)/1000)}`;
                                let span4 = document.createElement('span');
                                span4.className = "songAlbum";
                                span4.innerText = `${(playlistTracks[i].track.album.name).slice(0, 25) + "..."}`;
                                span4.setAttribute("data-id", `${playlistTracks[i].track.album.id}`);

                                span4.addEventListener("click", () => {
                                        let id = span4.dataset.id;
                                        showAlbumTab(id);
                                });

                                div3.addEventListener("click", () => {
                                        showSongTab(div3.dataset.id);
                                });
                                
                                if(playlistTracks[i].track.artists.length > 1){
                                        for(x=0; x < playlistTracks[i].track.artists.length; x++){
                                                let div = document.createElement('div');
                                                div.className = "songArtist";
                                                div.setAttribute("data-id", `${playlistTracks[i].track.artists[x].id}`);

                                                if(x == (playlistTracks[i].track.artists.length - 1)){
                                                        div.innerHTML = `${playlistTracks[i].track.artists[x].name}`;
                                                } else {
                                                        div.innerHTML = `${playlistTracks[i].track.artists[x].name}, `; 
                                                }
                                                
                                                div.addEventListener("click", async () => {
                                                        let id = div.dataset.id;
                                                        showArtistTab(id);
                                                });
                                                div4.appendChild(div);
                                        };
                                } else {
                                        let div = document.createElement('div');
                                        div.className = "songArtist";                                                
                                        div.setAttribute("data-id", `${playlistTracks[i].track.artists[0].id}`);
                                        
                                        div.innerHTML = `${playlistTracks[i].track.artists[0].name}`;

                                        div.addEventListener("click", async () => {
                                                let id = div.dataset.id;
                                                showArtistTab(id);
                                        });
                                        div4.appendChild(div);
                                }

                                span2.appendChild(image);
                                div1.appendChild(span1);
                                div1.appendChild(span2);
                                div1.appendChild(div2);
                                div2.appendChild(div3);
                                div2.appendChild(div4);
                                div1.appendChild(span3);
                                div1.appendChild(span4);

                                playlistTracksContainer.appendChild(div1);
                        };
                } else {
                        for(i=0; i < playlistTracks.length; i++){
                                let div1 = document.createElement('div');
                                div1.className = "songs playlistMusicTracks";
                                let span1 = document.createElement('span');
                                span1.className = "songNum";
                                span1.innerHTML = `${playlistTracks[i].discNumber}`;
                                let span2 = document.createElement('span');
                                span2.className = "songImage";
                                let image = document.createElement('img');
                                image.src = `${playlistTracks[i].track.album.images[2].url}`;
                                let div2 = document.createElement('div');
                                div2.className = "songTitleDiv2";
                                let div3 = document.createElement("div");
                                div3.className = "songTitle";
                                div3.innerHTML = `${playlistTracks[i].track.name}`;
                                div3.dataset.id = `${playlistTracks[i].track.id}`;
                                let span3 = document.createElement('span');
                                let div4 = document.createElement("div");
                                div4.className = "songArtists";
                                span3.className = "songDuration";
                                span3.innerHTML = `${calculateTime((playlistTracks[i].track.duration)/1000)}`;
                                let span4 = document.createElement('span');
                                span4.className = "songAlbum";
                                span4.innerText = `${(playlistTracks[i].track.album.name).slice(0, 25) + "..."}`;
                                span4.setAttribute("data-id", `${playlistTracks[i].track.album.id}`);

                                span4.addEventListener("click", () => {
                                        let id = span4.dataset.id;
                                        showAlbumTab(id);
                                });
                                
                                div3.addEventListener("click", () => {
                                        showSongTab(div3.dataset.id);
                                });

                                if(playlistTracks[i].track.artists.length > 1){
                                        for(x=0; x < playlistTracks[i].track.artists.length; x++){
                                                let div = document.createElement('div');
                                                div.className = "songArtist";
                                                div.setAttribute("data-id", `${playlistTracks[i].track.artists[x].id}`);

                                                if(x == (playlistTracks[i].track.artists.length - 1)){
                                                        div.innerHTML = `${playlistTracks[i].track.artists[x].name}`;
                                                } else {
                                                        div.innerHTML = `${playlistTracks[i].track.artists[x].name}, `; 
                                                }
                                                
                                                div.addEventListener("click", async () => {
                                                        let id = div.dataset.id;
                                                        showArtistTab(id);
                                                });
                                                div4.appendChild(div);
                                        };
                                } else {
                                        let div = document.createElement('div');
                                        div.className = "songArtist";                                                
                                        div.setAttribute("data-id", `${playlistTracks[i].track.artists[0].id}`);
                                        
                                        div.innerHTML = `${playlistTracks[i].track.artists[0].name}`;

                                        div.addEventListener("click", async () => {
                                                let id = div.dataset.id;
                                                showArtistTab(id);
                                        });
                                        div4.appendChild(div);
                                }

                                span2.appendChild(image);
                                div1.appendChild(span1);
                                div1.appendChild(span2);
                                div1.appendChild(div2);
                                div2.appendChild(div3);
                                div2.appendChild(div4);
                                div1.appendChild(span3);
                                div1.appendChild(span4);

                                playlistTracksContainer.appendChild(div1);

                        };
                }
        } else {
                // do nothing
        }
        const image = document.querySelector('#playlistImage');
        const bg = document.querySelector(".playlistTile");
        image.onload = function () {
                image.crossOrigin = "Anonymous";
                const {R, G, B} = getColor(image, 4);
                bg.style.background = `rgb(${R}, ${G}, ${B})`
                
                playlistTabs.classList.remove("hide");
                Loader.classList.add("hide");
        };                
};

const toggleFullscreen = () => {
        if(document.fullscreen == false){
                document.documentElement.requestFullscreen();
        } else {
                document.exitFullscreen();
        }
};

const returnToHome = () => {
        artistTab.classList.add("hide");
        tabs.classList.remove("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
};

const showSongTab = async (id) => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        Loader.classList.remove("hide");

        const query = document.getElementById("player");
        const song = await fetchTrack(id);
        const songMusic = document.getElementById("songMusic");
        const songs = document.querySelectorAll(".songsTab");
        const songName = document.getElementById("songName");
        const songAlbumImage = document.getElementById("songAlbumImage");
        const songArtist = document.getElementById("songArtistName");

        songName.innerText = `${song.name.slice(0, 18) + "..."}`;
        songAlbumImage.src = song.album.images[0].url;

        if(songs.length > 0){
                songs.forEach(el => el.remove());
        } else {
                // do nothing
        }

        let div1 = document.createElement('div');
        div1.className = "songs songsTab";
        let span1 = document.createElement('span');
        span1.className = "songNum";
        span1.innerHTML = `${song.discNumber}`;
        let span2 = document.createElement('span');
        span2.className = "songImage";
        let image = document.createElement('img');
        image.src = `${song.album.images[2].url}`;
        let div2 = document.createElement('div');
        div2.className = "songTitleDiv2";
        let div3 = document.createElement("div");
        div3.className = "songTitle";
        div3.innerHTML = `${song.name}`;
        div3.dataset.id = `${song.id}`;
        let span3 = document.createElement('span');
        let div4 = document.createElement("div");
        div4.className = "songArtists";
        span3.className = "songDuration";
        span3.innerHTML = `${calculateTime((song.duration)/1000)}`;
        let span4 = document.createElement('span');
        span4.className = "songAlbum";
        span4.innerText = `${(song.album.name).slice(0, 25) + "..."}`;
        span4.dataset.id = `${(song.album.id)}`;

        span4.addEventListener("click", () => {
                showAlbumTab(span4.dataset.id);
        });
                         
        div3.addEventListener("click", () => {
                showSongTab(div3.dataset.id);
        });

        if(song.artists.length > 1){
                for(x=0; x < song.artists.length; x++){
                        let div = document.createElement('div');
                        div.className = "songArtist";
                        div.setAttribute("data-id", `${song.artists[x].id}`);

                        if(x == (song.artists.length - 1)){
                                div.innerHTML = `${song.artists[x].name}`;
                        } else {
                                div.innerHTML = `${song.artists[x].name}, `; 
                        }
                                                
                        div.addEventListener("click", async () => {
                                let id = div.dataset.id;
                                showArtistTab(id);
                        });
                        div4.appendChild(div);
                };
        } else {
                let div = document.createElement('div');
                div.className = "songArtist";                                                
                div.setAttribute("data-id", `${song.artists[0].id}`);
                                        
                div.innerHTML = `${song.artists[0].name}`;

                div.addEventListener("click", async () => {
                        let id = div.dataset.id;
                        showArtistTab(id);
                });
                div4.appendChild(div);
        }

        span2.appendChild(image);
        div1.appendChild(span1);
        div1.appendChild(span2);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div2.appendChild(div4);
        div1.appendChild(span3);
        div1.appendChild(span4);

        songMusic.appendChild(div1);

        Loader.classList.add("hide");
        songTabs.classList.remove("hide");
};

const showAlbumTab = async (id) => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        Loader.classList.remove("hide");

        const albumName = document.getElementById("albumName");
        const albumArtist = document.getElementById("albumArtist");
        const albumType = document.getElementById("albumType");
        const albumImage = document.getElementById("albumImage");
        const query = document.getElementById("player");
        const albumMusicDiv = document.getElementById("albumMusic");
        const songArtists = document.getElementsByClassName("songArtists");
        
        const Album = await fetchAlbum(id);
        // const AlbumTracks = await fetchAlbumTracks(query.dataset.albumid);

        if(Album){
                albumName.innerText = `${(Album.metadata[0].albumName).slice(0, 18) + "..."}`;
        
                albumArtist.innerText = Album.metadata[0].artist[0].name;

                if(Album.metadata[0].albumType == "single"){
                        albumType.innerText = "Single";
                } else {
                        albumType.innerText = "Album";
                }

                albumImage.src = Album.metadata[0].images[0].url;
        } else {
                // do nothing for now
        }

        var albumSong = document.querySelectorAll(".albumSong");

        if(Album.tracks){
                albumSong.forEach(el => el.remove());
                if(albumSong.length == 0){
                        for(i=0; i < Album.tracks.length; i++){
                                let div1 = document.createElement('div');
                                div1.className = "songs albumSong";
                                let span1 = document.createElement('span');
                                span1.className = "songNum";
                                span1.innerHTML = `${Album.tracks[i].trackId}`;
                                let span2 = document.createElement('span');
                                span2.className = "songImage";
                                let image = document.createElement('img');
                                image.src = `${Album.metadata[0].images[2].url}`;
                                let div2 = document.createElement('div');
                                div2.className = "songTitleDiv";
                                let div3 = document.createElement("div");
                                div3.className = "songTitle";
                                div3.innerHTML = `${Album.tracks[i].trackName}`;
                                div3.dataset.id = `${Album.tracks[i].id}`;
                                let span3 = document.createElement('span');
                                let div4 = document.createElement("div");
                                div4.className = "songArtists";
                                span3.className = "songDuration";
                                span3.innerHTML = `${calculateTime((Album.tracks[i].trackDuration)/1000)}`;

                                div3.addEventListener("click", () => {
                                        showSongTab(div3.dataset.id);
                                });

                                if(Album.tracks[i].artists.length > 1){
                                        for(x=0; x < Album.tracks[i].artists.length; x++){
                                                let div = document.createElement('div');
                                                div.className = "songArtist";
                                                div.setAttribute("data-id", `${Album.tracks[i].artists[x].id}`);

                                                if(x == (Album.tracks[i].artists.length - 1)){
                                                        div.innerHTML = `${Album.tracks[i].artists[x].name}`;
                                                } else {
                                                        div.innerHTML = `${Album.tracks[i].artists[x].name}, `; 
                                                }
                                                
                                                div.addEventListener("click", async () => {
                                                        let id = div.dataset.id;
                                                        showArtistTab(id);
                                                });
                                                div4.appendChild(div);
                                        };
                                } else {
                                        let div = document.createElement('div');
                                        div.className = "songArtist";                                                
                                        div.setAttribute("data-id", `${Album.tracks[i].artists[0].id}`);
                                        
                                        div.innerHTML = `${Album.tracks[i].artists[0].name}`;

                                        div.addEventListener("click", async () => {
                                                let id = div.dataset.id;
                                                showArtistTab(id);
                                        });
                                        div4.appendChild(div);
                                }

                                


                                span2.appendChild(image);
                                div1.appendChild(span1);
                                div1.appendChild(span2);
                                div1.appendChild(div2);
                                div2.appendChild(div3);
                                div2.appendChild(div4);
                                div1.appendChild(span3);

                                albumMusicDiv.appendChild(div1);
                        };  
                } else {
                        for(i=0; i < Album.tracks.length; i++){
                                let div1 = document.createElement('div');
                                div1.className = "songs albumSong";
                                let span1 = document.createElement('span');
                                span1.className = "songNum";
                                span1.innerHTML = `${Album.tracks[i].trackId}`;
                                let span2 = document.createElement('span');
                                span2.className = "songImage";
                                let image = document.createElement('img');
                                image.src = `${Album.metadata[0].images[2].url}`;
                                let div2 = document.createElement('div');
                                div2.className = "songTitleDiv";
                                let div3 = document.createElement("div");
                                div3.className = "songTitle";
                                div3.innerHTML = `${Album.tracks[i].trackName}`;
                                div3.dataset.id = `${Album.tracks[i].id}`;
                                let span3 = document.createElement('span');
                                let div4 = document.createElement("div");
                                div4.className = "songArtists";
                                span3.className = "songDuration";
                                span3.innerHTML = `${calculateTime((Album.tracks[i].trackDuration)/1000)}`;

                                div3.addEventListener("click", () => {
                                        showSongTab(div3.dataset.id);
                                });

                                if(Album.tracks[i].artists.length > 1){
                                        for(x=0; x < Album.tracks[i].artists.length; x++){
                                                let div = document.createElement('div');
                                                div.className = "songArtist";
                                                div.setAttribute("data-id", `${Album.tracks[i].artists[x].id}`);

                                                if(x == (Album.tracks[i].artists.length - 1)){
                                                        div.innerHTML = `${Album.tracks[i].artists[x].name}`;
                                                } else {
                                                        div.innerHTML = `${Album.tracks[i].artists[x].name}, `; 
                                                }
                                                
                                                div.addEventListener("click", async () => {
                                                        let id = div.dataset.id;
                                                        showArtistTab(id);
                                                });
                                                div4.appendChild(div);
                                        };
                                } else {
                                        let div = document.createElement('div');
                                        div.className = "songArtist";                                                
                                        div.setAttribute("data-id", `${Album.tracks[i].artists[0].id}`);
                                        
                                        div.innerHTML = `${Album.tracks[i].artists[0].name}`;

                                        div.addEventListener("click", async () => {
                                                let id = div.dataset.id;
                                                showArtistTab(id);
                                        });
                                        div4.appendChild(div);
                                }

                                


                                span2.appendChild(image);
                                div1.appendChild(span1);
                                div1.appendChild(span2);
                                div1.appendChild(div2);
                                div2.appendChild(div3);
                                div2.appendChild(div4);
                                div1.appendChild(span3);

                                albumMusicDiv.appendChild(div1);
                        };  
                }
        } else {
                // do nothing for now
        }
        
        const image = document.querySelector('#albumImage');
        const bg = document.querySelector(".albumTile");
        image.onload = function () {
                image.crossOrigin = "Anonymous";
                const {R, G, B} = getColor(image, 4);
                bg.style.background = `rgb(${R}, ${G}, ${B})`
                
                albumTabs.classList.remove("hide");
                Loader.classList.add("hide");                
        }; 
};

const showLyricsTab = () => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.remove("hide");
        playlistTabs.classList.add("hide");
};
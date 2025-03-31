const artistTab = document.getElementById("artistTabs");
const tabs = document.getElementById("tabs");
const songTabs = document.getElementById("songsTabs");
const albumTabs = document.getElementById("albumTabs");
const lyricsTabs = document.getElementById("lyricsTab");
const playlistTabs = document.getElementById("playlistTabs");
const Loader = document.getElementById("preloader");
const userTabs = document.getElementById("userTabs");

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

const calculateDuration = (duration) => {
        let hours = Math.floor((((duration/1000)/60)/60));
        let minutes = (Math.floor(((duration/1000)/60))%60);

        if(hours == 0){
                const durationStr = `${minutes}min`;
                return durationStr;
        } else {
                const durationStr = `${hours} hr, ${minutes} min`;
                return durationStr;
        };   
};

const showOptions = () => {
        const opt = document.getElementById("playlistOptions");
        opt.classList.toggle("hide");
};

const showArtistTab = async (id) => {
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        artistTab.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        userTabs.classList.add("hide");
        Loader.classList.remove("hide");
        
        const artistQuery = document.getElementById("songArtist").innerText;
        const artist = await fetchArtist(id);
        const artistTopTracks = await fetchArtistTopTracks(id);
        const artistsAlbums = await fetchArtistsAlbums(id);
        const relatedArtists = await fetchRelatedArtists(id);
        const artistMusicContainer = document.getElementById("songsCon");
        const artistMusic = document.querySelectorAll(".artistTopTracks");
        const albums = document.getElementsByClassName("artistAlbumIn");
        const artistNameFooter = document.getElementById("artistNameFooter");

        if(artist && artistTopTracks){
                let artistName = document.getElementById("artistName");
                let artistVerification = document.getElementById("artistVer");
                let artistFollowers = document.getElementById("artistFollowers");
                let artistTracks = document.getElementsByClassName("artistTopTracks");
                let artistTracksNum = document.getElementsByClassName("songNum");
                let artistTracksImg = document.getElementsByClassName("artistTrackImg");

                artistNameFooter.innerText = `@${artist.name}`;
                if(artist.name.length >= 28){
                        artistName.innerText = `${artist.name.slice(0, 28)}...`;
                } else {
                        artistName.innerText = artist.name;
                }

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
                        div1.className = `songs artistTopTracks artistTopTracks${i}`;
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
                        div3.className = `songTitle wMax`;

                        if(artistTopTracks[i].name.length >= 50){
                                div3.innerHTML = `${(artistTopTracks[i].name).slice(0, 45)}...`;
                        } else {
                                div3.innerHTML = `${artistTopTracks[i].name}`;
                        }
                        
                        div3.dataset.id = `${artistTopTracks[i].songId}`;
                        let span3 = document.createElement('span');
                        let div4 = document.createElement("div");
                        div4.className = "songArtists";
                        span3.className = "songDuration";
                        span3.innerHTML = `${calculateTime((artistTopTracks[i].duration)/1000)}`;
                        let div5 = document.createElement('div');
                        div5.className = "songAlbum";
                        let span4 = document.createElement('span');
                        span4.className = "wMax";

                        if((artistTopTracks[i].album.name).length >= 40){
                                span4.innerText = `${(artistTopTracks[i].album.name).slice(0, 35)}...`;
                        } else {
                                span4.innerText = `${(artistTopTracks[i].album.name)}`;
                        }

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
                        div5.appendChild(span4);
                        div1.appendChild(div5);

                        artistMusicContainer.appendChild(div1);

                        checkIfTrackIsSaved(artistTopTracks[i].songId, `artistTopTracks${i}`);
                }
        } else {
                console.log("artist doesnt exist!");
        }

        if(artistsAlbums){
                for(i=0; i < 5; i++){
                        albums[i].children[0].children[0].children[0].src = artistsAlbums[i].images[1].url;

                        if(artistsAlbums[i].name.length >= 20){
                                albums[i].children[0].children[1].children[0].innerText = `${artistsAlbums[i].name.slice(0, 19)}...`;
                        } else {
                                albums[i].children[0].children[1].children[0].innerText = artistsAlbums[i].name;
                        }

                        albums[i].children[0].children[1].setAttribute("data-id", `${artistsAlbums[i].id}`);

                        if(artistsAlbums[i].albumGroup == "album"){
                                albums[i].children[0].children[2].children[0].innerText = `${artistsAlbums[i].releaseDate.slice(0, 4)} • Album`;
                        } else {
                                albums[i].children[0].children[2].children[0].innerText = `${artistsAlbums[i].releaseDate.slice(0, 4)} • Single`;
                        };                        
                };
        } else {
                // do nothing for now
        }

        if(relatedArtists){
                for(x=0,i=5; i < 10; i++, x++){
                        albums[i].children[0].children[0].children[0].src = relatedArtists[x].images[1].url;
                        
                        if(relatedArtists[x].name.length >= 20){
                                albums[i].children[0].children[1].children[0].innerText = `${relatedArtists[x].name.slice(0, 19)}...`;
                        } else {
                                albums[i].children[0].children[1].children[0].innerText = relatedArtists[x].name;
                        }

                        albums[i].children[0].children[1].setAttribute("data-id", `${relatedArtists[x].id}`);

                        albums[i].children[0].children[2].children[0].innerText = `Artist`;
                };
        } else {
                //  do nothing for now
        };

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
        userTabs.classList.add("hide");
        Loader.classList.remove("hide");  

        // const src = "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848c1d9d1eae3a41255542bef0";

        // extractColors(src).then(console.log).catch(console.error);
        
        const playlistName = document.getElementById("playlistName");
        const playlistOwner = document.getElementById("playlistOwner");
        const playlistImage = document.getElementById("playlistImage");
        const playlistTracksContainer = document.getElementById("playlistMusic");
        const playlistNoMusic = document.getElementById("playlistNoSongs");
        const playlistTimeDuration = document.getElementById("playlistDuration");
        const optionControls = document.querySelectorAll(".opt");
        const playlistMetadata = await fetchPlaylist(id);
        const playlistTracks = await fetchPlaylistTracks(id);

        optionControls[5].setAttribute("data-vos", `https://open.spotify.com/playlist/${playlistMetadata.id}`);
        optionControls[4].setAttribute("data-surl", `https://open.spotify.com/playlist/${playlistMetadata.id}`);

        optionControls[5].addEventListener("click", async () => {
                window.open(optionControls[5].dataset.vos);
        });

        optionControls[4].addEventListener("click", async () => {
                let surl = optionControls[4].dataset.surl;
                navigator.clipboard.writeText(surl);
        });

        optionControls[3].addEventListener("click", async () => {
                const pinning = pinPoA(playlistMetadata);
                pinning.oncomplete = () => {
                        console.log("Pinned!");
                };

                pinning.onerror = () => {
                        console.log("Can not pin it.");
                };
        });

        optionControls[0].addEventListener("click", () => {
                const tracksToBeAddedToQueue = loadedPlaylist;
                
        });

        if(playlistMetadata.name >= 19){
                playlistName.innerText = `${playlistMetadata.name.slice(0, 19)}...`
        } else {
                playlistName.innerText = playlistMetadata.name;
        }

        let dr = 0;

        for(i=0; i < playlistTracks.length; i++){
                 dr = dr + playlistTracks[i].track.duration;
        };

        playlistTimeDuration.innerText = `${calculateDuration(dr)}`;

        playlistImage.src = playlistMetadata.image;
        playlistOwner.innerText = playlistMetadata.owner.name;
        playlistOwner.dataset.id = playlistMetadata.owner.id;
        playlistNoMusic.innerText = playlistMetadata.totalTracks + " songs";
        // console.log(this.dataset.playlistid);

        playlistOwner.addEventListener("click", async () => {
                showUserTab(playlistOwner.dataset.id);
        });

        const playlistMusicTracks = document.querySelectorAll(".playlistMusicTracks");
        if(playlistTracks){
                if(playlistMusicTracks.length > 0){
                        playlistMusicTracks.forEach(el => el.remove());
                        loadedPlaylist.length = 0;
                        for(i=0; i < playlistTracks.length; i++){
                                let div1 = document.createElement('div');
                                div1.className = `songs playlistMusicTracks playlistTracks${i}`;
                                div1.setAttribute("data-id", `${playlistTracks[i].track.id}`);
                                let span1 = document.createElement('span');
                                span1.className = "songNum";
                                span1.innerHTML = `${playlistTracks[i].discNumber}`;
                                let span2 = document.createElement('span');
                                span2.className = "songImage";
                                let image = document.createElement('img');
                                image.src = `${playlistTracks[i].track.album.images[2].url}`;
                                image.setAttribute("data-bigimg", `${playlistTracks[i].track.album.images[0].url}`);
                                let div2 = document.createElement('div');
                                div2.className = "songTitleDiv2";
                                let div3 = document.createElement("div");
                                div3.className = "songTitle wMax";

                                if(playlistTracks[i].track.name.length >= 45){
                                        div3.innerHTML = `${playlistTracks[i].track.name.slice(0, 45)}...`;
                                } else {
                                        div3.innerHTML = `${playlistTracks[i].track.name}`;
                                }

                                div3.dataset.id = `${playlistTracks[i].track.id}`;
                                let span3 = document.createElement('span');
                                let div4 = document.createElement("div");
                                div4.className = "songArtists";
                                span3.className = "songDuration";
                                span3.innerHTML = `${calculateTime((playlistTracks[i].track.duration)/1000)}`;
                                let div5 = document.createElement("div");
                                div5.className = "songAlbum";
                                let span4 = document.createElement('span');
                                span4.className = "wMax";

                                if(playlistTracks[i].track.album.name.length >= 30){
                                        span4.innerText = `${(playlistTracks[i].track.album.name).slice(0, 30) + "..."}`;
                                } else {
                                        span4.innerText = `${(playlistTracks[i].track.album.name)}`;
                                }

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
                                div5.appendChild(span4);
                                div1.appendChild(div5);

                                playlistTracksContainer.appendChild(div1);
                                checkIfTrackIsSaved(playlistTracks[i].track.id, `playlistTracks${i}`);
                        };
                } else {
                        for(i=0; i < playlistTracks.length; i++){
                                let div1 = document.createElement('div');
                                div1.className = `songs playlistMusicTracks playlistTracks${i}`;
                                div1.setAttribute("data-id", `${playlistTracks[i].track.id}`);
                                let span1 = document.createElement('span');
                                span1.className = "songNum";
                                span1.innerHTML = `${playlistTracks[i].discNumber}`;
                                let span2 = document.createElement('span');
                                span2.className = "songImage";
                                let image = document.createElement('img');
                                image.src = `${playlistTracks[i].track.album.images[2].url}`;
                                image.setAttribute("data-bigimg", `${playlistTracks[i].track.album.images[0].url}`);
                                let div2 = document.createElement('div');
                                div2.className = "songTitleDiv2";
                                let div3 = document.createElement("div");
                                div3.className = "songTitle wMax";

                                if(playlistTracks[i].track.name.length >= 45){
                                        div3.innerHTML = `${playlistTracks[i].track.name.slice(0, 45)}...`;
                                } else {
                                        div3.innerHTML = `${playlistTracks[i].track.name}`;
                                }
                                
                                div3.dataset.id = `${playlistTracks[i].track.id}`;
                                let span3 = document.createElement('span');
                                let div4 = document.createElement("div");
                                div4.className = "songArtists";
                                span3.className = "songDuration";
                                span3.innerHTML = `${calculateTime((playlistTracks[i].track.duration)/1000)}`;
                                let div5 = document.createElement("div");
                                div5.className = "songAlbum";
                                let span4 = document.createElement('span');
                                span4.className = "wMax";

                                if(playlistTracks[i].track.album.name.length >= 30){
                                        span4.innerText = `${(playlistTracks[i].track.album.name).slice(0, 30) + "..."}`;
                                } else {
                                        span4.innerText = `${(playlistTracks[i].track.album.name)}`;
                                }

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
                                div5.appendChild(span4);
                                div1.appendChild(div5);

                                playlistTracksContainer.appendChild(div1);

                                checkIfTrackIsSaved(playlistTracks[i].track.id, `playlistTracks${i}`);
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
        
        const btn = document.getElementById("tilePlayBtn");

        checkIfPlaylistIsSaved(id, btn);
};

const toggleFullscreen = () => {
        if(document.fullscreen == false){
                document.documentElement.requestFullscreen();
        } else {
                document.exitFullscreen();
        }
};

const returnToHome = () => {
        Loader.classList.remove("hide");
        artistTab.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        userTabs.classList.add("hide");
        tabs.classList.remove("hide");
        Loader.classList.add("hide");
};

const showSongTab = async (id) => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        userTabs.classList.add("hide");
        Loader.classList.remove("hide");

        const query = document.getElementById("player");
        const song = await fetchTrack(id);
        const songMusic = document.getElementById("songMusic");
        const songs = document.querySelectorAll(".songsTab");
        const songName = document.getElementById("songName");
        const songAlbumImage = document.getElementById("songAlbumImage");
        const songArtist = document.getElementById("songArtistName");
        const songFootArtist = document.getElementById("artistCopySong");

        if(song.name.length >= 19){
                songName.innerText = `${song.name.slice(0, 19)}...`;
        } else {
                songName.innerText = song.name;
        }

        songAlbumImage.src = song.album.images[0].url;
        songArtist.innerText = `${song.artists[0].name}`;
        songArtist.setAttribute("data-id", `${song.artists[0].id}`);
        songFootArtist.innerText = song.artists[0].name;

        if(songs.length > 0){
                songs.forEach(el => el.remove());
        } else {
                // do nothing
        }

        let div1 = document.createElement('div');
        div1.className = "songs songsTab songsTabTrack";
        // let img = document.createElement('img');
        // img.src = "/icons/play.png";
        // img.className = "songPlayBtn hide";
        let span1 = document.createElement("span");
        span1.className = "songNum"
        span1.innerHTML = `${song.discNumber}`;
        let span2 = document.createElement('span');
        span2.className = "songImage";
        let image = document.createElement('img');
        image.src = `${song.album.images[2].url}`;
        let div2 = document.createElement('div');
        div2.className = "songTitleDiv2";
        let div3 = document.createElement("div");
        div3.className = "songTitle wMax";
        div3.innerHTML = `${song.name}`;
        div3.dataset.id = `${song.id}`;
        let span3 = document.createElement('span');
        let div4 = document.createElement("div");
        div4.className = "songArtists";
        span3.className = "songDuration";
        span3.innerHTML = `${calculateTime((song.duration)/1000)}`;
        let div5 = document.createElement("div");
        div5.className = "songAlbum";
        let span4 = document.createElement('span');
        span4.className = "wMax";

        if(song.album.name.length >= 40){
                span4.innerText = `${song.album.name.slice(0, 35)}...`;
        } else {
                span4.innerText = `${song.album.name}`;
        }

        span4.dataset.id = `${(song.album.id)}`;

        span4.addEventListener("click", () => {
                showAlbumTab(span4.dataset.id);
        });
                         
        // div3.addEventListener("click", () => {
        //         showSongTab(div3.dataset.id);
        // });

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
        // div1.appendChild(img);
        div1.appendChild(span2);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div2.appendChild(div4);
        div1.appendChild(span3);
        div5.appendChild(span4);
        div1.appendChild(div5);

        songMusic.appendChild(div1);

        // div1.addEventListener("mouseover", () => {
        //         span1.classList.add("hide");
        //         img.classList.remove("hide");
        // });

        // div1.addEventListener("mouseout", () => {
        //         span1.classList.remove("hide");
        //         img.classList.add("hide");
        // });



        const songimage = document.querySelector('#songAlbumImage');
        const bg = document.querySelector(".songsTile");
        songimage.onload = function () {
                songimage.crossOrigin = "Anonymous";
                const {R, G, B} = getColor(songimage, 4);
                bg.style.background = `rgb(${R}, ${G}, ${B})`
                
                songTabs.classList.remove("hide");
                Loader.classList.add("hide");
        }; 

        const trackId = song.id;

        // console.log(track, trackId);
        checkIfTrackIsSaved(trackId, "songsTabTrack");

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
        userTabs.classList.add("hide");
        Loader.classList.remove("hide");

        const albumName = document.getElementById("albumName");
        const albumArtist = document.getElementById("albumArtist");
        const albumType = document.getElementById("albumType");
        const albumImage = document.getElementById("albumImage");
        const query = document.getElementById("player");
        const albumMusicDiv = document.getElementById("albumMusic");
        const songArtists = document.getElementsByClassName("songArtists");
        const alar = document.getElementById("albumArtistFooterCr");
        
        const Album = await fetchAlbum(id);
        // const AlbumTracks = await fetchAlbumTracks(query.dataset.albumid);
        if(Album){
                alar.innerText = `@${Album.metadata[0].artist[0].name}`;

                if(Album.metadata[0].albumName.length >= 19){
                        albumName.innerText = `${(Album.metadata[0].albumName).slice(0, 19) + "..."}`;
                } else {
                        albumName.innerText = `${(Album.metadata[0].albumName)}`;
                }
        
                albumArtist.innerText = Album.metadata[0].artist[0].name;
                albumArtist.setAttribute("data-id", `${Album.metadata[0].artist[0].id}`);

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
                                div1.className = `songs albumSong albumTracks${i}`;
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
                                div3.className = "songTitle wMax";
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

                                checkIfTrackIsSaved(Album.tracks[i].id, `albumTracks${i}`);
                        };  
                } else {
                        for(i=0; i < Album.tracks.length; i++){
                                let div1 = document.createElement('div');
                                div1.className = `songs albumSong albumTracks${i}`;
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
                                div3.className = "songTitle wMax";
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
                                };

                                span2.appendChild(image);
                                div1.appendChild(span1);
                                div1.appendChild(span2);
                                div1.appendChild(div2);
                                div2.appendChild(div3);
                                div2.appendChild(div4);
                                div1.appendChild(span3);

                                albumMusicDiv.appendChild(div1);

                                checkIfTrackIsSaved(Album.tracks[i].id, `albumTracks${i}`);
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

const showUserTab = async (id) => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.add("hide");
        playlistTabs.classList.add("hide");
        Loader.classList.remove("hide");

        const userName = document.getElementById("userName");
        const userImage = document.getElementById("userImage");
        const userNoPlaylist = document.getElementById("userNoPlaylist");
        const playlists = document.getElementsByClassName("playlist");
        const userFooter = document.getElementsByClassName("userFooter");

        const User = await fetchUser(id);
        const UserPlaylist = await fetchUsersPlaylist(id);

        if(User){
                userName.innerText = User.displayName;
                userImage.src = User.images[1].url;
                userFooter[0].children[0].innerText = `@${User.displayName}`;
        } else {
                console.log("User cannot be found!");
        }

        if(UserPlaylist){
                userNoPlaylist.innerText = `${(UserPlaylist.length - 1)} playlists`;

                for(i = 0; i < playlists.length; i++){
                        playlists[i].children[0].children[0].children[0].src = UserPlaylist[i].images[0].url;
                        playlists[i].children[0].children[1].children[0].innerText = UserPlaylist[i].name;
                        playlists[i].children[0].children[2].children[0].innerText = `By ${UserPlaylist[i].owner.displayName}`;
                };
        } else {
                console.log("No playlist was found!");
        }

        userTabs.classList.remove("hide");
        Loader.classList.add("hide");
};

const showLyricsTab = () => {
        artistTab.classList.add("hide");
        tabs.classList.add("hide");
        songTabs.classList.add("hide");
        albumTabs.classList.add("hide");
        lyricsTabs.classList.remove("hide");
        playlistTabs.classList.add("hide");
};





// 1000
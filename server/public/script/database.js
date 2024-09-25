// window.onload = () => {

    let loadedPlaylist = [];
    let recentlyPlayedTracks = [];

    let db;

    const DBOpenRequest = window.indexedDB.open("xpotify", 10);

    const song = [
        {
            "id" : "58OLgaQqdVuRQMAjRTppGW",
            "artist" : {
                "id": "0a3zDmrvmZcORfPeONPvfL",
                "name" : "Rauf and Faik"
            },
            "trackName" : "wonderful",
            "audioSrcPath" : "6FYbr9QzRoZPh0Re8lDO9z.mp3",
            "album" : {
                "name" : "wonderful",
                "id" : "4OmHxZnWYTIFKqDpWO7SuT",
                "image" : {
                    "url" : "https://i.scdn.co/image/ab67616d00001e0230fffb512d624059038851f2"
                }
            }
        }
    ];    

    const playlist = [
        {
            "id" : "5o6QR9AF8o9l4GwAbGbIUk",
            "owner" : "CyberRodeo"
        }
    ];

    DBOpenRequest.onerror = () => {
        console.log("Databse cannot be opened!");
    };

    DBOpenRequest.onsuccess = (event) => {
        db = DBOpenRequest.result;

        console.log("Database has been opened!");
        
        // saveTracksToDB(song);
        // const transaction = db.transaction("savedSongs", "readwrite");
        // const objectStore = transaction.objectStore("savedSongs");

        // transaction.oncomplete = () => {
        //     console.log("Transaction completed!");
        // };

        // transaction.onerror = () =>{
        //     console.log("Transaction could not be completed!");
        // };

        // const request = objectStore.get("2fCklc5HvH4eeu2ilTEvvM");

        // request.onsuccess = () => {
        //     console.log(request.result);
        // };  

        // request.onerror = (event) => {
        //     console.log(event.error);
        // };
        // const request = objectStore.add(songs[0]);

        // request.oncomplete = () => {
        //     console.log("objectStore operation request fulfilled!");
        // };
    };

    DBOpenRequest.onupgradeneeded = (event) => {
        db = event.target.result;

        db.onerror = () => {
            console.log("Error loading database!");
        };

        const objectStore = db.createObjectStore(["savedPlaylists"], { keyPath: "id"});
        objectStore.createIndex("artist", "artist", { unique: false });
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.transaction.oncomplete = () => {
            console.log("ObjectStore setting up completed!");
        };
    };

    const saveTrackToDB = async (track) => {
        const transaction = db.transaction(["savedSongs"], "readwrite");
        const objectStore = transaction.objectStore("savedSongs");

        transaction.oncomplete = () => {
            console.log("Transaction Complete!");
        };

        transaction.onerror = () => {
            console.log("Transaction could not be finished!");
        };

        const request = objectStore.add(track);

        request.onsuccess = () => {
            console.log("Request operation on objectStore fulfilled!");
        };

        request.onerror = () => {
            console.log("Request cannot be fulfilled.");
        };
    };

    const saveTracksToDB = async (track) => {
        const transaction = db.transaction(["savedSongs"], "readwrite");
        const objectStore = transaction.objectStore("savedSongs");

        transaction.oncomplete = () => {
            console.log("Transaction Complete!");
        };

        transaction.onerror = () => {
            console.log("Transaction could not be finished!");
        };

        for(i=0; i < track.length; i++){
            const request = objectStore.add(track[i]);

            request.onsuccess = () => {
                console.log("Request operation on objectStore fulfilled!");
            };
    
            request.onerror = () => {
                console.log("Request cannot be fulfilled.");
            };
        };
    };

    // const elem = document.getElementById("lewis");

    // elem.addEventListener("click", () => {
    //     checkIfPlaylistIsSaved("h1u2h3uk1h31u3h", "playlistMusicTracks");
    // });

    const checkIfPlaylistIsSaved = (playlist, btn) => {
        // console.log(tracks);
        const transaction = db.transaction(["savedPlaylists"], "readwrite");
        const objectStore = transaction.objectStore("savedPlaylists");

        transaction.oncomplete = () => {
            console.log("Transaction has been completed!")  
        };

        transaction.onerror = () => {
            console.log("Transaction could not be completed!");
        };

        const request = objectStore.get(playlist);
                                                                                    
        request.onsuccess = (event) => {
            // console.log(request.result);
            
            let data = [];

            if(request.result == undefined){
                // Do nothing;
            } else {
                data.push([request.result]);
            };
            
            if(data.length == 1){
                console.log("Yes! the playlist exists!");
                // btn.src = "/icons/playB.png";
            } else {
                console.log("No! the playlist does not exist!");
                // btn.src = "/icons/download.png";
            };
        };

        request.onerror = () => {
            console.log(request.error);
        };
    };

    const savePlaylistToDB = () => {
        const transaction = db.transaction(["savedPlaylists"], "readwrite");
        const objectStore = transaction.objectStore("savedPlaylists");

        transaction.oncomplete = () => {
            console.log("Transaction has been completed!");
        };

        transaction.onerror = () => {
            console.log("Transaction could not be completed.");
        };

        const request = objectStore.add(playlist);

        request.onsuccess = () => {
            console.log("Playlist has been successfully added to the database!");
        };

        request.onerror = () => {
            console.log(request.error);
        };
    };

    const addOpacClass = (elem) => {
        const target = document.getElementsByClassName(elem);
        // console.log(target);

        for(i=0; i < target.length; i++){
            target[i].classList.add("opac");
        };

        // console.log("This is it!");
    };

    const checkIfTrackIsSaved = async (track, targetElem) => {
        const transaction = db.transaction(["savedSongs"], "readwrite");
        const objectStore = transaction.objectStore("savedSongs");

        transaction.oncomplete = () => {
            console.log("Transaction has been completed!");
        };

        transaction.onerror = () => {
            console.log("Transaction could not be completed.");
        };

        const request = objectStore.get(track);

        request.onsuccess = (event) => {
            // console.log(request.result);
            
            let data = [];

            if(request.result == undefined){
                // Do nothing;
            } else {
                data.push([request.result]);
            };
            
            if(data.length == 1){
                console.log("Yes! the track exists! TFTF");
                const elem = document.getElementsByClassName(`${targetElem}`);
                loadedPlaylist.push(data[0][0]);
                elem[0].setAttribute("data-srcpath", data[0][0].audioSrcPath);
                elem[0].addEventListener("dblclick", () => {
                    let song = data[0][0];
                    recentlyPlayedTracks.unshift(song);
                    let src = song.audioSrcPath;
                    songCoverImage.src = `${song.album.image.url}`;
                    songCoverImage.dataset.albumid = `${song.album.id}`;
                    songName.innerText = `${(song.trackName).slice(0, 26)}...`
                    songName.dataset.id = `${song.id}`;
                    songArtist.innerText = `${song.artist.name}`;
                    songArtist.dataset.artistid = `${song.artist.id}`;
                    audio.src = `/songs/${song.audioSrcPath}`;
                    changeSiteTitle(song.trackName, song.artist.name);
                    // changeSongMetaData(z+1);
                    changePlayPause('play');
                    displayDuration();
                    setSliderMax();
                    audio.play();
                });
            } else {
                console.log("No! the track does not exist!");
                addOpacClass(targetElem);
                const elem = document.getElementsByClassName(`${targetElem}`);
                const notif = document.getElementById("unavnotif");
                elem[0].addEventListener("dblclick", async (e) => {
                    // console.log(target);
                    // console.log(notif);
                    notif.style.visibility = "visible";
                    setInterval(() => {
                        notif.style.visibility = "hidden";
                    }, 5000);

                    const trackName = elem[0].children[2].children[0].innerText;
                    const artistName = elem[0].children[2].children[1].children[0].innerText;
                    const trackId = elem[0].dataset.id;
                    const query = (`${trackName} - ${artistName} - Official Audio`);
                    const idFromYouTube = await getTracksIdFromYT(query);
                    // console.log(idFromYouTube);
                    const track = [
                        {
                            "id" : elem[0].dataset.id,
                            "artist" : {
                                "id": elem[0].children[2].children[1].children[0].dataset.id,
                                "name" : elem[0].children[2].children[1].children[0].innerText
                            },
                            "trackName" : elem[0].children[2].children[0].innerText,
                            "audioSrcPath" : `${elem[0].dataset.id}.mp3`,
                            "album" : {
                                "name" : elem[0].children[4].children[0].innerText,
                                "id" : elem[0].children[4].children[0].dataset.id,
                                "image" : {
                                    "url" : elem[0].children[1].children[0].dataset.bigimg
                                }
                            },
                            "duration" : elem[0].children[3].innerText
                        }
                    ];
                    // console.log(track);
                    downloadSongReq(idFromYouTube, trackId).then(() => {
                        saveTracksToDB(track);
                        elem[0].setAttribute("data-srcpath", `${trackId}.mp3`);
                        console.log("saved!");
                        setInterval(() => {
                            elem[0].classList.remove("opac");
                        }, 3000);
                    });

                    elem[0].addEventListener("dblclick", () => {
                      const transaction = db.transaction(["savedSongs"], "readwrite");

                      const objectStore = transaction.objectStore("savedSongs");

                      transaction.oncomplete = () => {
                        console.log("Transaction has been completed!");
                      };

                      transaction.onerror = () => {
                        console.log(err);
                      };

                      const request = objectStore.get(trackId);

                      request.onsuccess = () => {
                        let data = [];

                        if(request.result == undefined){
                            // Do nothing;
                        } else {
                            data.push([request.result]);
                        };

                        let song = data[0][0];

                        let src = elem[0].dataset.srcpath;
                        songCoverImage.src = `${song.album.image.url}`;
                        songCoverImage.dataset.albumid = `${song.album.id}`;
                        songName.innerText = `${(song.trackName)}`
                        songName.dataset.id = `${song.id}`;
                        songArtist.innerText = `${song.artist.name}`;
                        songArtist.dataset.artistid = `${song.artist.id}`;
                        audio.src = `/songs/${src}`;
                        changeSiteTitle(song.trackName, song.artist.name);
                        // changeSongMetaData(z+1);
                        changePlayPause('play');
                        displayDuration();
                        setSliderMax();
                        audio.play();
                      };

                      request.onerror = () => {
                        console.log(err);
                      };
                    });
                }, {once : true});
            };
        };

        request.onerror = () => {
            console.log(request.error);
        };
    };

    const pinPoA = async (metadata) => {
        const transaction = db.transaction(["pinned"], "readwrite");
        
        transaction.oncomplete = () => {
            console.log("Transaction has been completed!");
        };  

        transaction.onerror = () => {
            console.log("Transacion could not be fulfilled!");
        };
        
        const objectStore = transaction.objectStore("pinned");     
        
        const request = objectStore.add(metadata);

        request.onsuccess = () => {
            console.log("PoA pinned!")
        };

        request.onerror = () => {
            console.log("Can not pin it.", request.err);
        };     
    };
// };
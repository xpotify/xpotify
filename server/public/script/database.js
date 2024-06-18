// window.onload = () => {
    let db;

    const DBOpenRequest = window.indexedDB.open("xpotify", 4);

    const song = [
        {
            "id" : "5O0zUvdnJr0RbWzLFneN2i",
            "artists" : "The Weeknd",
            "name" : "Popular",
            "audioSrcPath" : "test4.mp3"
        },
        {
            "id" : "2z5t8IRRtt5vwkSzP9umJo",
            "artists" : "Ashely Cooke",
            "name" : "in your place",
            "audioSrcPath" : "test5.mp3"
        },
        {
            "id" : "799XxzSlWNYkuWJxUbuGnF",
            "artists" : "Metallica",
            "name" : "Master of Puppets",
            "audioSrcPath" : "test5.mp3"
        }
    ];    

    const playlist = [
        {
            "id" : "5o6QR9AF8o9l4GwAbGbIUk",
            "owner" : "CyberRodeo"
        }
    ]

    DBOpenRequest.onerror = () => {
        console.log("Databse cannot be opened!");
    };

    DBOpenRequest.onsuccess = (event) => {
        db = DBOpenRequest.result;

        console.log("Database has been opened!");
        
        
        // saveTrackToDB(song);
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
        objectStore.createIndex("owner", "owner", { unique: false });
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

    const checkIfPlaylistIsSaved = (playlist, targetElem) => {
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
            } else {
                console.log("No! the playlist does not exist!");
                addOpacClass(targetElem);
                // tracks.classList.add("opac");
            }
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
    }
// };
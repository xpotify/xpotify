const isThisPlaylistSaved = (id) => {
    return new Promise((resolve, reject) => {
        let db;
        const DBOpenRequest = indexedDB.open("xpotify", 1);

        DBOpenRequest.onsuccess = () => {
            db = DBOpenRequest.result;
            const transaction = db.transaction("savedPlaylists", "readonly");
            const objectStore = transaction.objectStore("savedPlaylists");
    
            const request = objectStore.get(id);
    
            request.onsuccess = (event) => {
                if(event.target.result != undefined){
                    resolve(true);
                } else {
                    resolve(false);
                }
            };
    
            request.onerror = (event) => {
                reject("Error:", event.errorCode);
            };
        };

        DBOpenRequest.onerror = (err) => {
            console.log("Error:", err);
        };
    });
};

const savePlaylist = (p) => {
    return new Promise((resolve, reject) => {
        let db;

        const DBOpenRequest = indexedDB.open("xpotify", 1);

        DBOpenRequest.onsuccess = () => {
            db = DBOpenRequest.result;

            const transaction = db.transaction("savedPlaylists", "readwrite");
            const objectStore = transaction.objectStore("savedPlaylists");

            transaction.onsuccess = () => {
                console.log("Transaction has been fulfilled.");
            };

            transaction.onerror = () => {
                console.log("Transaction could not be fulfilled.");
            };

            const request = objectStore.add(p);

            request.onsuccess = () => {
                resolve("Request to add playlist on DB has been fulfilled.")
            };

            request.onerror = (error) => {
                reject("Error: ", error);
            };
        };

        DBOpenRequest.onerror = () => {
            console.log("DB could not be opened.");
        };
    });
};

const savePlaylistsToDB = (playlists) => {
    return new Promise((resolve, reject) => {
        let db;

        const DBOpenRequest = indexedDB.open("xpotify", 1);

        DBOpenRequest.onsuccess = () => {
            db = DBOpenRequest.result;

            const transaction = db.transaction("savedPlaylists", "readwrite");
            const objectStore = transaction.objectStore("savedPlaylists");

            if(playlists.length == 1){  
                savePlaylist(playlist);
            } else {
                for(i=0; i < playlist.length; i++){
                    const request = objectStore.add(playlist[i]);

                    request.oncomplete = () => {
                        resolve("Playlist has been added to the DB");
                    };
                    
                    request.onerror = () => {
                        reject("Error: ", request.error.name, request.error.message);
                    };
                };
            };
        };
    });
};

cost
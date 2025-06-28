// window.onload = () => {
//     let db;
//     const DBOpenRequest = window.indexedDB.open("xpotify", 1);
//     DBOpenRequest.onerror = (err) => {
//         console.log("DB could not be opened.", err.message);
//     };
//     DBOpenRequest.onsuccess = () => {
//         db = DBOpenRequest;
//       c  console.log("DB has been opened.");
//     };

//     DBOpenRequest.onupgradeneeded = (event) => {
//         db = event.target.result;

//         db.onerror = () => {
//             console.log("Error loading database!");
//         };

//         const objectStore = db.createObjectStore(["savedPlaylists"], { keyPath: "id"});
//         objectStore.createIndex("id", "id", { unique: true });
//         objectStore.transaction.oncomplete = () => {
//             console.log("ObjectStore setting up completed!");
//         };
//     };
// };

const pushTrackToDB = async (track) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["savedTracks"], "readwrite");

        transaction.oncomplete = () => {
            console.log("Transaction has been fulfilled.");
        };

        transaction.onerror = (err) => {
            console.log("Transaction could not be fulfilled.", err.message);
        };

        const objectStore = transaction.objectStore("savedTracks");

        const request = objectStore.add(track);

        request.onsuccess = () => {
            resolve(
                console.log("Track has been saved.")
            );
        };

        request.onerror = () => {
            reject(
                console.log("Track could not be saved.")
            );
        };
    });
};

const pushTracksToDB = async (tracks) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["savedPlaylists"], "readwrite");

        transaction.oncomplete = () => {
            console.log("Transaction has been fulfilled!");
        };

        transaction.onerror = () => {
            console.log("Transaction could not be fulfilled!");
        };

        const objectStore = transaction.objectStore("savedTracks");

        for (i = 0; i < tracks.length; i++) {
            const request = objectStore.add(tracks[i]);

            request.onsuccess = () => {
                console.log("Track has been added ", i);
            };

            request.onerror = () => {
                console.log("Track could not be added ", i);
            };
        };
    });
};

const isThisPlaylistSaved = (id) => {
    return new Promise(async (reject, resolve) => {
        const transaction = db.transaction(["savedPlaylists"], "readwrite");

        transaction.oncomplete = () => {
            console.log("Transaction has been fulfilled.");
        };

        transaction.onerror = () => {
            console.log("Transaction could not be finished.");
        };

        const objectStore = transaction.objectStore("savedPlaylists");

        const request = objectStore.get(id);
        let response;

        request.onsuccess = () => {
            if (request.result == undefined) {
                resolve(
                    response = false
                );
            } else {
                resolve(
                    response = true
                );
            };
        }

        request.onerror = () => {
            console.log("lol");
        };

        return response;
    });
};

const pushPlaylistToDB = async (playlist) => {
    return new Promise((reject, resolve) => {
        const transaction = db.transaction(["savedPlaylists"], "readwrite");

        transaction.oncomplete = () => {
            console.log("Transaction has been fulfilled");
        };

        transaction.onerror = (event) => {
            console.log(event.error.message);
        };

        const objectStore = transaction.objectStore("savedPlaylists");

        const request = objectStore.add(playlist);

        request.onsuccess = () => {
            console.log("Request has been fulfilled");
        };

        request.onerror = (event) => {
            console.log("Request could not be fulfilled");
        };
    });
};

const isThisTrackSaved = async (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["savedTracks"], "readonly");
        const objectStore = transaction.objectStore("savedTracks");
        const request = objectStore.get(id);

        request.onsuccess = function (){
            resolve(request.result !== undefined);
        };

        request.onerror = function (){
            reject(false);
        };
    });
};

// const leti = await (async () => {
//     const response = await isThisTrackSaved("ji1j23kl1j3k1l3j");
//     return response;
// });

const fetchTrackFromDB = async (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["savedTracks"], "readonly");
        const objectStore = transaction.objectStore("savedTracks");

        const request  = objectStore.get(id);

        request.onsuccess = () => {
            if(request.result !== undefined){
                resolve(request.result);
            } else {
                resolve(null);
            }
        };

        request.onerror = () => {
            reject("Request could not be fulfilled");
        };
    });
};

const pinPlaylist = async (playlist) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["pinnedPlaylists"], "readwrite");
        const objectStore = transaction.objectStore("pinnedPlaylists");

        const request =  objectStore.add(playlist);

        request.onsuccess = () => {
            resolve("Playlist Pinned!");
        };

        request.onerror = () => {
            reject("Playist could not be pinned");
        };
    });
};

const isThisPlaylistPinned = async (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["pinnedPlaylists"], "readwrite");
        const objectStore = transaction.objectStore("pinnedPlaylists");

        const request = objectStore.get(id);

        request.onsuccess = () => {
            if(request.result !== undefined){
                resolve(true);
            } else {
                resolve(false);
            }
        };
    });
};

const unpinPlaylist = async (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["pinnedPlaylists"], "readwrite");
        const objectStore = transaction.objectStore("pinnedPlaylists");

        const request = objectStore.delete(id);

        request.onsuccess = () => {
            resolve("Playlist unpinned");
        }; 

        request.onerror = () => {
            resolve("Playlist could not be unpinned.")
        };
    });
};
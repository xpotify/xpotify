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
            console.log("Trasacntion could not be fulfilled.", err.message);
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
            console.log(event.err);
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
    try{
        const transaction = db.transaction(["savedTracks"], "readonly");

        transaction.oncomplete = () =>{
            console.log("Transaction has been fulfilled");
        };

        const objectStore = transaction.objectStore("savedTracks");

        const request = objectStore.get(id);

        let leti =[];

        request.onsuccess = () => {
            if(request.result == undefined){
                leti.push(request.result);
            } else {
                // do nothing;
            }
        };

        request.onerror = () => {
            console.log("Error");
        };

        if(leti.length > 0){
            return true;
        } else {
            return false;
        }
    } catch(error){

    };
};
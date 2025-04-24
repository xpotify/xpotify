// let db;

// const DBOpenRequest = window.indexedDB.open("xpotifyv2", 0);

// DBOpenRequest.onerror = () => {
//     console.log("DBOpenRequest Failed.");
// };

// DBOpenRequest.onsuccess = (event) => {
//     db = DBOpenRequest.result;
//     console.log("Database open request success.");
// };

// DBOpenRequest.onupgradeneeded = async (event) => {
//     db = event.target.result;

//     db.onerror = () => {
//         console.log("Error loading Database");
//     };

//     const objectStore = db.createObjectStore(["savedPlaylists"], {keypath: "id"});
//     objectStore.createIndex("artist", "artist", {unique: false});
//     objectStore.createIndex("name", "name", {unique: false});
//     objectStore.transaction.oncomplete = () => {
//         console.log("ObjectStore has finished setting up.");
//     };
// };

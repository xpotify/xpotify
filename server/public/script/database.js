window.onload = () => {
    let db;

    const DBOpenRequest = window.indexedDB.open("xpotify", 3);

    const songs = [
        {
            "id" : "2fCklc5HvH4eeu2ilTEvvM",
            "artists" : "1nonly",
            "name" : "Shakira!",
            "audioSrcPath" : "test2.mp3"
        }
    ]

    DBOpenRequest.onerror = () => {
        console.log("Databse cannot be opened!");
    };

    DBOpenRequest.onsuccess = (event) => {
        db = event.target.result;

        console.log("Database has been opened!");

        const transaction = db.transaction("savedSongs", "readwrite");
        const objectStore = transaction.objectStore("savedSongs");

        transaction.oncomplete = () => {
            console.log("Transaction completed!");
        };

        transaction.onerror = () =>{
            console.log("Transaction could not be completed!");
        };

        const request = objectStore.add(songs[0]);

        request.oncomplete = () => {
            console.log("objectStore operation request fulfilled!");
        };
    };

    DBOpenRequest.onupgradeneeded = (event) => {
        db = event.target.result;

        db.onerror = () => {
            console.log("Error loading database!");
        };

        const objectStore = db.createObjectStore(["savedSongs"], { keyPath: "id"});
        objectStore.createIndex("artists", "artists", { unique: false });
        objectStore.createIndex("name", "name", { unique: false});
        objectStore.transaction.oncomplete = () => {
            console.log("ObjectStore setting up completed!");
        };

        
    };
};
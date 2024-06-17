window.onload = () => {
    let db;

    const DBOpenRequest = window.indexedDB.open("xpotify", 3);

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

    DBOpenRequest.onerror = () => {
        console.log("Databse cannot be opened!");
    };

    DBOpenRequest.onsuccess = (event) => {
        db = event.target.result;

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

        const objectStore = db.createObjectStore(["savedSongs"], { keyPath: "id"});
        objectStore.createIndex("artists", "artists", { unique: false });
        objectStore.createIndex("name", "name", { unique: false});
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
};
window.onload = () => {
    let db;

    const DBOpenRequest = window.indexedDB.open("xpotify", 2);

    DBOpenRequest.onerror = () => {
        console.log("Databse cannot be opened!");
    };

    DBOpenRequest.onsuccess = () => {
        console.log("Database has been opened!");
    };

    DBOpenRequest.onupgradeneeded = (event) => {
        db = event.target.result;

        db.onerror = () => {
            console.log("Error loading database!");
        };

        const objectStore = db.createObjectStore(["saved songs"], { keyPath: "id"});
        objectStore.transaction.oncomplete = () => {
            console.log("ObjectStore creating completed!");
        };
    };
};
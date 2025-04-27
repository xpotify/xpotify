const isThisPlaylistSaved = (id) => {
    const transaction = db.transaction(["savedPlaylists"], "readwrite");
    const objectStore = transaction.objectStore("savedPlaylists");

    transaction.oncomplete = () => {
        console.log("Transaction has been completed!");
    };

    transaction.onerror = () => {
        console.log("Transaction could not be completed!");
    };

    const request = objectStore.get(id);
    var response;

    request.onsuccess = () => {
        let data = [];

        if(request.result == undefined){
            // do nothing
        } else {
            data.push([request.result]);
        };

        if(data.length == 1){
            response = true;
        } else {
            response = false;
        }
    };

    request.onerror = () => {
        console.log(request.error);
    };

    console.log(response);
    return response;
};
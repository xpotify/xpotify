const downloadSongReq = async (id, trackName) => {
    const request = fetch(`/${id}/${trackName}`, {
        method: "post"
    });

    request.oncomplete = () => {
        console.log("Track download request complete!");
    };
}
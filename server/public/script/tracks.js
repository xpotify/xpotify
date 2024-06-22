const downloadSongReq = async (id, trackName) => {
    const request = fetch(`/${id}/${trackName}`, {
        method: "post"
    });

    request.oncomplete = () => {
        console.log("Track download request complete!");
    };
};

const getTracksIdFromYT = async (query) => {
    const request = await fetch(`/song/getdetails/${query}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    const data = await request.json();
    const id = data[0].id.videoId;
    return id;
};  
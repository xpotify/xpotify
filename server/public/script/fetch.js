const fetchArtist = async (id) => {
    const response = await fetch(`http://localhost:6969/artist/q/${id}`, {
        method: "GET", 
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
        });
        
    const data = await response.json();

    // console.log(data[0]);
    return data[0];
};

const fetchPlaylist = async (id) => {
    const response = await fetch(`http://localhost:6969/playlist/q/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    const data = await response.json();
    console.log(data);
};

const fetchPlaylistTracks = async (id) => {
    const response = await fetch(`http://localhost:6969/playlist/q/tracks/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    const data = await response.json();
    console.log(data);
};


const fetchArtistTopTracks = async (id) => {
    const response = await fetch(`http://localhost:6969/artist/toptracks/${id}`, {
        method: "GET", 
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
        });
        
    const data = await response.json();

    // console.log(data);
    return data;
};

const fetchTrack = async (id) => {
    const response = await fetch(`http://localhost:6969/song/gettrack/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    return data;
};

const fetchAlbum = async (id) => {
    const response = await fetch(`http://localhost:6969/album/get/${id}`, {
        method : "GET",
        mode : "cors",
        headers : {
            "Content-Type" : "application/json"
        }
    });

    const data = await response.json();
    return data;
};

const fetchAlbumTracks = async (id) => {
    const response = await fetch(`http://localhost:6969/album/gettracks/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    const data = await response.json();
    return data;
};
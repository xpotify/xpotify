const fetchArtist = async (id) => {
    const response = await fetch(`http://localhost:1212/artist/q/${id}`, {
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

const fetchPlaylist = async (id) => {
    const response = await fetch(`http://localhost:1212/playlist/q/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    const data = await response.json();
    return data
};

const fetchPlaylistTracks = async (id) => {
    const response = await fetch(`http://localhost:1212/playlist/q/tracks/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    const data = await response.json();
    return data;
};


const fetchArtistTopTracks = async (id) => {
    const response = await fetch(`http://localhost:1212/artist/toptracks/${id}`, {
        method: "GET", 
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
        });
        
    const data = await response.json();

    // console.log(data);`
    return data;
};

const fetchTrack = async (id) => {
    let parsedTrackId;
    if(id.length > 22){
        parsedTrackId =  await parseTrackId(id);
    } else {
        parsedTrackId =  id;
    }

    console.log(parsedTrackId);

    const response = await fetch(`http://localhost:1212/song/gettrack/${parsedTrackId}`, {
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
    const response = await fetch(`http://localhost:1212/album/get/${id}`, {
        method : "GET",
        mode : "cors",
        headers : {
            "Content-Type" : "application/json"
        }
    });

    const data = await response.json();
    return data;
};

const fetchUser = async (id) => {
    const response = await fetch(`http://localhost:1212/user/get/${id}`, {
        method: "GET",
        mode: "cors",
        headers : {
            "Content-Type" : "application/json"
        }
    });

    const data = await response.json();
    return data;
};

const fetchUsersPlaylist = async (id) => {
    const response = await fetch(`http://localhost:1212/user/getplaylist/${id}`, {
        method: "GET",
        mode: "cors",
        headers : {
            "Content-Type" : "application/json"
        }
    });

    const data = await response.json();
    return data;
};

const fetchArtistsAlbums = async (id) => {
    const response = await fetch(`http://localhost:1212/artist/getalbums/${id}`, {
        method : "GET",
        mode : "cors",
        headers : {
            "Content-Type" : "application/json"
        }
    });

    const data = await response.json();
    return data;
};

const fetchRelatedArtists = async (id) => {
    const response = await fetch(`http://localhost:1212/artist/getrelatedartists/${id}`, {
       method : "GET",
       mode : "cors",
       headers : {
            "Content-Type" : "application/json"
       }
    });

    const data = await response.json();
    return data;
};

const fetchHexOfImage = async (url) => {
    const response = await fetch(`http://localhost:1212/gethex/${url}`, {
        method : "GET",
        mode : "cors",
        headers : {
            "Content-Type" : "appliaction/json"
        }
    });

    const data = await response.json();
    return data;
};
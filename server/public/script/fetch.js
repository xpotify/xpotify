const fetchArtist = async (id) => {
    const response = await fetch(`http://localhost:6969/artist/q/${id}`, {
        method: "GET", 
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
        });
        
    const data = await response.json();

    console.log(data);
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

const fetchTracks = async (id) => {
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
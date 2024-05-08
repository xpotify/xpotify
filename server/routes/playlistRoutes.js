const express = require("express");
const router = express.Router();
require('dotenv').config();

const { Client } = require("spotify-api.js");
const cli = new Client({ 
    token: { clientID: process.env.cId, clientSecret: process.env.cSecret}
});

const getPlaylist = async (id) => {
    const data = await cli.playlists.get(id);
    return data;
};

const getTracks = async (id) => {
    const data = await cli.playlists.getTracks(id);
    return data;
};

router.get("/q/:id", async (req, res) => {
    const query = await getPlaylist(req.params.id);
    const playlist = {
        "id" : query.id,
        "image" : query.images[0].url,
        "name" : query.name,
        "owner" : {
            "name" : query.owner.displayName,
            "id" : query.owner.id
        },
        "totalTracks" : query.totalTracks

    }
    // console.log(query);
    res.json(playlist);
});

router.get("/q/tracks/:id", async (req, res) => {
    const response = await getTracks(req.params.id);
    var tracks = [];
    for(i=0, x=1; i < response.length; i++,x++){
        var gotTrack = {
        "id" : x,
        "songId" : response[i].track.id,
        "name" : response[i].track.name,
        "artist" : response[i].track.artists,
        "ytQuery" : response[i].track.name + " - " + response[i].track.artists[0].name,
        "albumId" : response[i].track.album.id,
        "images" : response[i].track.album.images
    };
    tracks.push(gotTrack);
};
    // console.log(query);
    res.json(response);
});

module.exports = router;
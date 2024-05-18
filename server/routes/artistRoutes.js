const express = require("express");
const router = express.Router();
require('dotenv').config();
const { Client } = require("spotify-api.js");
const cli = new Client({ 
    token: { clientID: process.env.cId, clientSecret: process.env.cSecret}
});

const getArtist = async (id) => {
    const data = await cli.artists.get(id);
    return data;
};

router.get("/q/:id", async (req, res) => {
    const query = await getArtist(req.params.id);
    // console.log(query);
    res.json(query);
});

const getTopTracks = async (id) => {
    const data = await cli.artists.getTopTracks(id);
    return data;
};

router.get("/toptracks/:id", async (req, res) => {
    const response = await getTopTracks(req.params.id);
    var tracks = [];

    for(i=0, x=1; i < response.length; i++, x++){
        var gotTrack = {
            "id" : x,
            "artists" : response[i].artists,
            "duration" : response[i].duration,
            "songId" : response[i].id,
            "name" : response[i].name,
            "album" : {
                "name" : response[i].album.name,
                "id" : response[i].album.id,
                "img" : response[i].album.images
            }
        }

        tracks.push(gotTrack);
    }

    // console.log(query);
    res.json(tracks);
});

module.exports = router;
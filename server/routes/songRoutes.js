const express = require("express");
const router = express.Router();
require('dotenv').config();
const { Client } = require("spotify-api.js");
const cli = new Client({ 
    token: { clientID: process.env.cId, clientSecret: process.env.cSecret}
});

const getTopTracks = async (id) => {
    const data = await cli.artists.getTopTracks(id);
    return data;
};

const getTrack = async (id) => {
    const data = await cli.tracks.get(id);
    return data;
};

router.get("/gettoptracks/:id", async (req, res) => {
    const query = await getTopTracks(req.params.id);
    // console.log(query);
    res.json(query);
});

router.get("/gettrack/:id", async (req, res) => {
    const response = await getTrack(req.params.id);
    var data = 
        {
            "artists" : response.artists,
            "discNumber":  response.discNumber,
            "duration" : response.duration,
            "explicit" : response.explicit,
            "url" : response.externalURL.spotify,
            "id" : response.id,
            "name" : response.name,
            "type" : response.type,
            "album" : {
                "artists" : response.album.artists,
                "id" : response.album.id,
                "images" : response.album.images,
                "name" : response.album.name,
                "realease-date" : response.album.releaseDate,
                "totalTracks" : response.album.totalTracks,
                "type" : response.album.type
            },
            "popularity" : response.popularity
        }
    ;
    
    res.json(data);
});

module.exports = router;
const express = require("express");
const router = express.Router();
require('dotenv').config();
const { Client } = require("spotify-api.js");
const cli = new Client({ 
    token: { clientID: process.env.cId, clientSecret: process.env.cSecret}
});

const { google } = require("googleapis");
const youtube = google.youtube({
    version: 'v3',
    auth: process.env.gapiKey
});

const getTopTracks = async (id) => {
    const data = await cli.artists.getTopTracks(id);
    return data;
};

const getTrack = async (id) => {
    const data = await cli.tracks.get(id);
    return data;
};

const getVideoDetails = async (query) => {
    const response = await youtube.search.list({
        part: "snippet",
        q: query,
        maxResults: 1
    });

    const fetchedItems = response.data.items;
    // console.log(fetchedItems);
    return fetchedItems;
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
                "releaseDate" : response.album.releaseDate,
                "totalTracks" : response.album.totalTracks,
                "type" : response.album.type
            },
            "popularity" : response.popularity
        }
    ;
    
    res.json(data);
});

router.get("/getdetails/:query", async (req, res) => {
    const response = await getVideoDetails(req.params.query);
    
    res.json(response);
});

module.exports = router;
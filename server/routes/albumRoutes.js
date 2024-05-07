const express = require("express");
const router = express.Router();
require('dotenv').config();
const { Client } = require("spotify-api.js");
const cli = new Client({ 
    token: { clientID: process.env.cId, clientSecret: process.env.cSecret}
});

const getAlbum = async (id) => {
    const data = cli.albums.get(id);
    return data;
};

const getAlbumTracks = async (id) => {
    const data = await cli.albums.getTracks(id);
    return data;
};

router.get("/get/:id", async (req, res) => {
    const response = await getAlbum(req.params.id);

    const data = {
        "metadata" : [
            {
                    "artist" : response.artists,
                    "albumType" : response.albumType,
                    "albumId" : response.id,
                    "images" : response.images,
                    "albumName" : response.name,
                    "albumReleaseDate" : response.releaseDate,
                    "totalTracks" : response.totalTracks
            }
            
        ],
        "tracks" : [

        ]  
    };

    for(i=0, x=1; i < response.tracks.length; i++, x++){
        var track = {
            "trackId" : x,
            "artists" : response.tracks[i].artists,
            "discNumber" : response.tracks[i].discNumber,
            "trackDuration" : response.tracks[i].duration,
            "trackExplicity" : response.tracks[i].explicit,
            "id" : response.tracks[i].id,
            "trackName" : response.tracks[i].name,
            "type" : response.tracks[i].type
        }
        
        data.tracks.push(track);
    };

    res.json(data);
});

router.get("/getTracks/:id", async (req, res) => {
    const response = await getAlbumTracks(req.params.id);

    const data = [];

    for(i=0; i < response.length; i++){
        let tracks = {
            "artists" : response[i].artists,
            "discNumber" : response[i].discNumber,
            "duration" : response[i].duration,
            "explicit" : response[i].explicit,
            "externalSpotifyUrl" : response[i].externalURL.spotify,
            "id" : response[i].id,
            "name" : response[i].name,
            "type" : response[i].type,
        }

        data.push(tracks);
    }

    res.json(data);
});

module.exports = router;
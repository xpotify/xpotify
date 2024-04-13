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

router.get("/get/:id", async (req, res) => {
    const response = await getAlbum(req.params.id);

    const data = [
        [
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
        [

        ]
    ];

    for(i=0,x=0; i < response.tracks.lengh; i++,x++){
        var tracks = {
            "trackId" : x,
            "artists" : response.tracks[i].artists,
            "discNumber" : response.tracks[i].discNumber,
            "trackDuration" : response.tracks[i].duration,
            "trackExplicity" : response.tracks[i].explicit,
            "id" : response.tracks[i].id,
            "trackName" : response.tracks[i].name,
            "type" : response.tracks[i].type
        }

        console.log(tracks);

        data[1].push(tracks);
    };

    res.json(data);
});

module.exports = router;
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
            "addedAt" : response[i].addedAt,
            "isLocal" : response[i].isLocal,
            "discNumber" : x,
            "track" : {
                "artists" : response[i].track.artists,
                "discNumber" : response[i].track.discNumber,
                "duration" : response[i].track.duration,
                "explicit" : response[i].track.explicit,
                "spotifyURL" : response[i].track.externalURL.spotify,
                "id" : response[i].track.id,
                "isLocal" : response[i].track.isLocal,
                "name" : response[i].track.name,
                "trackNumber" : response[i].track.trackNumber,
                "type" : response[i].track.type,
                "album" : {
                    "artists" : response[i].track.album.artists,
                    "albumType" : response[i].track.album.albumType,
                    "spotifyURL" : response[i].track.album.externalURL.spotify,
                    "id" : response[i].track.album.id,
                    "images" : response[i].track.album.images,
                    "name" : response[i].track.album.name,
                    "releaseDate" : response[i].track.album.releaseDate,
                    "totalTracks" : response[i].track.album.totalTracks,
                    "type" : response[i].track.album.type,
                },
                "popularity" : response[i].track.popularity
            }
    };
    tracks.push(gotTrack);
};
    // console.log(query);
    res.json(tracks);
});

router.get("/testing", async (req, res) => {
    const response = await cli.playlists.("1JXmQxcfIdcKnU7gNw9tbP");
    res.json(response);
});

module.exports = router;
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

router.get("/gettoptracks/:id", async (req, res) => {
    const query = await getTopTracks(req.params.id);
    // console.log(query);
    res.json(query);
});

module.exports = router;
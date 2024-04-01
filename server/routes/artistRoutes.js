const express = require("express");
const router = express.Router();
require('dotenv').config();
const { Client } = require("spotify-api.js");
const cli = new Client({ 
    token: { clientID: process.env.cId, clientSecret: process.env.cSecret}
});

const getArtist = async () => {
    const data = await cli.artists.search("alan walker");
    return data;
};

router.get("/q/:id", async (req, res) => {
    const query = await getArtist(req.params.id);
    // console.log(query);
    res.json(query);
});

module.exports = router;
const express = require("express");
const router = express.Router();
require('dotenv').config();
const { Client } = require("spotify-api.js");
const cli = new Client({ 
    token: { clientID: process.env.cId, clientSecret: process.env.cSecret}
});

const getUser = async (id) => {
    const response = await cli.users.get(id);

    return response;
};

router.get("/get/:id", async (req, res) => {
    const user = await getUser(req.params.id);

    res.json(user);
});

module.exports = router;
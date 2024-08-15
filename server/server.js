const express = require('express'),
      app = express(),
      PORT = 1212;

// const { Client } = require("spotify-api.js");
// const cli = new Client({ 
//     token: { clientID: process.env.cId, clientSecret: process.env.cSecret}
// });

const artistRoutes = require("./routes/artistRoutes");
const songRoutes = require("./routes/trackRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const indexRoutes = require("./routes/indexRoutes");
const albumRoutes = require("./routes/albumRoutes");
const userRoutes = require("./routes/userRoutes");
require('dotenv').config();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static('public'));
app.use(indexRoutes);
app.use("/artist", artistRoutes);
app.use("/playlist", playlistRoutes);
app.use("/song", songRoutes);
app.use("/album", albumRoutes);
app.use("/user", userRoutes);

app.listen(PORT || process.env.PORT, process.env.IP, () => {
    console.log('xpotify server is up on PORT: ' + PORT);
});


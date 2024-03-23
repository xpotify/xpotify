const express = require('express'),
      app = express(),
      PORT = 6969;

const artist = require("./routes/artistRoutes");
const song = require("./routes/songRoutes");
const playlist = require("./routes/playlistRoutes");
const indexRoutes = require("./routes/indexRoutes");
require('dotenv').config();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static('public'));
app.use(indexRoutes);
app.use("/artist", artist);
// app.use("/playlist", playlist);
// app.use("/song", song);

app.listen(PORT || process.env.PORT, process.env.IP, () => {
    console.log('xpotify server is up on PORT: ' + PORT);
});


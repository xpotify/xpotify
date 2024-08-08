const express = require('express');
const router = express.Router();
const fs = require("fs");
const ytdl = require("@distube/ytdl-core");

const downloadSong = (id, trackName) => {
    const videoId = `https://www.youtube.com/watch?v=${id}`;
    console.log("fn triggered!");
    const download = ytdl(videoId, { filter: "audioonly", quality: "highestaudio"});
    const stream = fs.createWriteStream(`./public/songs/${trackName}.mp3`);

    download.pipe(stream).on("finish", () => {
        console.log("Track has been downloaded!");
    });
};

router.get('/', (req, res) => {
  res.render('home');
});

router.post("/:id/:trackname", (req, res) => {
  downloadSong(req.params.id, req.params.trackname);
});

module.exports = router;
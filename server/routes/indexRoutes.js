const express = require('express');
const router = express.Router();
const fs = require("fs");
const ytdl = require("@distube/ytdl-core");
const Vibrant = require('node-vibrant');

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

router.get('/v2', (req, res) => {
  res.render('v2');
});

router.post("/:id/:trackname", (req, res) => {
  downloadSong(req.params.id, req.params.trackname);
});

router.get("/getHex/*", async (req, res) => {
  let v = new Vibrant(req.params[0]);
  const hex = await v.getPalette((err, palette) => {return palette});
  res.json(hex.Vibrant.hex);
});

module.exports = router;
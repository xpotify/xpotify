const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

const fetchArtistBackground = async (artistId) => {
    const artistLink = `https://open.spotify.com/artist/1XgFuvRd7r5g0h844A5ZUQ`;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(artistLink, {
        waitUntil: "networkidle2"
    });

    const element = await page.$('[data-testid="background-image"');
    const leti = await page.$('mMx2LUixlnN_Fu45JpFB Ii9XdJaXIuKbmR1zC4Rt Yn2Ei5QZn19gria6LjZj');
    let letii = [];

    if(leti.length > 1){
        for(i=0; i < leti.length; i++){
            letii.push({i: leti[i].src});
        };
    } else {
        letii = leti;
    }

    console.log(leti);

    if(element){
        const backgroundImageLink = await page.evaluate(el => el.style.backgroundImage.slice(5, -2), element);
        console.log(backgroundImageLink);
        return backgroundImageLink;
    } else {
        console.log("Background Image link was not found.")
    }

    await browser.close();
};

router.get("/artistbg/:id", async (req, res) => {
    await fetchArtistBackground(req.params.id);
    res.send("HII LETI!");
});

module.exports = router;
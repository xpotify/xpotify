const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

const fetchArtistBackground = async (artistId) => {
    const artistLink = `https://open.spotify.com/artist/${artistId}`;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(artistLink, {
        waitUntil: "networkidle2"
    });

    const element = await page.$('div[data-testid="background-image"');
    let backgroundImageLink;


    if(element){
        backgroundImageLink = await page.evaluate(el => el.style.backgroundImage.slice(5, -2), element);
        return backgroundImageLink;
    } else {
        console.log("Background Image link was not found.");
        backgroundImageLink = null;
    }

    await browser.close();
    return backgroundImageLink;
};

router.get("/artistbg/:id", async (req, res) => {
    const arBg = await fetchArtistBackground(req.params.id);
    res.json(arBg);
});

module.exports = router;
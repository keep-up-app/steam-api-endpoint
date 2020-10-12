/**
 * Include all dependencies
 */

const gameController = require('../controllers/GameController');
const express = require('express');
const axios = require('axios');
const router = express.Router();

module.exports = router;


/**
 * Gets all owned game from user.
 * URI: steam/game/owned
 */

router.get('/owned/:steamid', async(req, res) => {

    let data = await gameController.getOwnedGame({
        freeToPlay: req.query.ftp,
        steamid: req.params.steamid,
        url: process.env.OWNED_GAME_URL,
        apiKey: process.env.STEAM_API_KEY
    }).catch(err => res.status(400).json({ error: err }));

    res.send(data);
});



/**
 * Gets game info.
 * URI: steam/game/info
 */

router.get('/info/:appid', async(req, res) => {

    let data = await gameController.getGameInfo({
        appid: req.params.appid,
        url: process.env.GAME_INFO_URL,
    }).catch(err => res.status(400).json({ error: err }));

    res.send(data);
});
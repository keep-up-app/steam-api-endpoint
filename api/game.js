/**
 * Include all dependencies
 */

const gameController = require('../controllers/GameController');
const format = require('../util/format')
const express = require('express');
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


/**
 * Get all games (IP BLACKLISTED)
 * URI: steam/game/all/blocked
 */

router.get('/all/blocked', async(req, res) => {

    let count = req.query.count || 10;

    let data = await gameController.getAllGames({count: count})
        .catch(err => res.send(err));
    
    let json = format.constructJSONPagination({
        content: data,
        count: count
    });

    res.send(json);
});


/**
 * Get all games
 * URI: steam/game/all
 */

router.get('/all', async(req, res) => {

    let page = parseInt(req.query.page) || 1;
    let range = parseInt(req.query.range) || 10;

    let data = await gameController.getBasicInfo(page, range)
        .catch(err => res.send(err));

    let baseUrl = `${process.env.BASE_URL}/steam/game/all`;
    let json = format.constructJSONPagination(
        baseUrl, data, page, range
    );

    res.send(json);
});
/**
 * Include all dependencies
 */

const gameController = require('../controllers/GameController');
const express = require('express');
const router = express.Router();

module.exports = router;


/**
 * Gets all owned game from user.
 * URI: steam/game/owned
 */

router.get('/owned/:steamid', async(req, res) => {

    let data = await gameController.getOwnedGame({
        steamid: req.params.steamid,
        url: process.env.GAME_INFO_URL,
        apiKey: process.env.STEAM_API_KEY
    }).catch(err => res.status(500).json({ error: err }));

    res.send(data);
});
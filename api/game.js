/**
 * Include all dependencies
 */

const gameController = require('../controllers/GameController');
const express = require('express');
const router = express.Router();

module.exports = router;


router.get('/', (req, res) => { res.send('MABITE') })


/**
 * Gets all owned game from user.
 * URI: steam/game/owned
 */

router.get('/owned/:steamid', async(req, res) => {

    const json = await gameController.getOwnedGame({
        steamid: req.params.steamid,
        url: process.env.GAME_INFO_URL,
        apiKey: process.env.STEAM_API_KEY
    }).catch(err => res.json({ error: err }));

    res.send(json);
});
/**
 * Include all dependencies
 */

const axios = require('axios');
const Game = require('../models/Game');
const validator = require('../util/validator');


/**
 * Retreives all games from user
 * 
 * @param {Object} params 
 */

module.exports.getOwnedGame = (params) => {
    return new Promise(async(resolve, reject) => {
        let steamid = params['steamid'];
        let gameInfoUrl = params['url'];
        let apikey = params['apiKey'];
        let freeToPlay = params['freeToPlay'] || '1';

        let validate = {
            'steamid': steamid,
            'url': gameInfoUrl,
            'apiKey': apikey
        }

        let invalid = validator.checkArgValidity(validate);
        if (invalid) reject(`Invalid ${invalid} provided: ${validate[invalid]}`);

        let baseUrl = `${gameInfoUrl}?key=${apikey}&include_played_free_games=${freeToPlay}&include_appinfo=1&steamid=${steamid}`

        const result = await axios.get(baseUrl)
            .then(res => res.data)
            .catch(err => reject(err))

        let count = result.response.game_count;
        var games = []

        if (count === undefined && count === 0) reject('This Steam user has no game: ' + steamid);

        for (var i = 0; i < count; i++)
            games.push(Game.constructModel(result.response.games[i]));

        resolve({ total: count, games: games });
    });
}
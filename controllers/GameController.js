/**
 * Include all dependencies
 */

const axios = require('axios');
const Game = require('../models/Game');


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

        let invalid = checkArgValidity(validate);
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


/**
 * Validator function to determing which inputted field is invalid.
 * Returns first invalid key
 * 
 * @param  {Object} fields 
 */

function checkArgValidity(fields) {
    for (var key in fields) {
        var field = fields[key];
        if (fields[key] === undefined || fields[key] == "")
            return key;
        else if (key == 'steamid' && field.length != 17) {
            return key;
        }
    }
}
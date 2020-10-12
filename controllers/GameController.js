/**
 * Include all dependencies
 */

const axios = require('axios');


/**
 * Retreives all games from user through steam api
 * 
 * @param {Object} params 
 */

module.exports.getOwnedGame = params => {
    return new Promise(async(resolve, reject) => {

        let steamid = params['steamid'];
        let ownGameUrl = params['url'];
        let apikey = params['apiKey'];
        let ftp = params['ftp'] || '1';

        let baseUrl = `${ownGameUrl}?key=${apikey}&include_played_free_games=${ftp}&include_appinfo=1&steamid=${steamid}`

        const result = await axios.get(baseUrl)
            .then(res => res.data)
            .catch(err => reject(err))

        resolve(result ? result : { error: 'No games found.' });
    });
}


/**
 * Retreives game info through steam api
 * 
 * @param {Object} params 
 */

module.exports.getGameInfo = params => {
    return new Promise(async(resolve, reject) => {

        let appid = params['appid'];
        let gameInfoUrl = params['url'];

        let baseUrl = `${gameInfoUrl}=${appid}`;

        const result = await axios.get(baseUrl)
            .then(res => res.data)
            .catch(err => reject(err))

        resolve(result ? result[appid].data : { error: 'No games found.' });
    });
}
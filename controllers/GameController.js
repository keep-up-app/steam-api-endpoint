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

        return resolve(result ? result : { error: 'No games found.' });
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

        return resolve(result ? result[appid].data : { error: 'No game found.' });
    });
}


/**
 * Retreive game data for pagination 
 * 
 * @param {Object} params 
 */

module.exports.getAllGames = params => {
    return new Promise(async(resolve, reject) => {

        let count = params.count || 10;

        let url = process.env.ALL_GAME_URL + "key=" + process.env.STEAM_API_KEY;
        let data = await axios.get(url).catch(err => reject(err));

        var games = [];

        count = 0;
        while(games.length <= count) {
            let appid = data.data.applist.apps[count].appid
            
            let paramaters = {
                appid: appid,
                url: process.env.GAME_INFO_URL,
            };

            let game = await this.getGameInfo(paramaters)
                .catch(err => reject(err));

            if (game) {
                console.log(count)
                games.push(game)
            }

            count++;
        }

        console.log(games.length)

        if (games) return resolve(games);
        else return reject({ error: 'No games found.'});
    });
}


/**
 * Retreive game data for pagination 
 * 
 * @param {Object} params 
 */

module.exports.getBasicInfo = (page, range) => {
    return new Promise(async(resolve, reject) => { 

        const from = page * range - range;
        const to = page * range;

        let url = process.env.ALL_GAME_URL + "key=" + process.env.STEAM_API_KEY;
        let data = await axios.get(url)
            .then(data => data.data.applist.apps)
            .catch(err => reject(err));

        return resolve({
            content: data.slice(from , to),
            total: data.length
        });
    });
}


/**
 * Retreive recently played games by steamid 
 * 
 * @param {Object} params 
 */

module.exports.getRecentlyPlayed = steamid => {
    return new Promise(async(resolve, reject) => { 
        let url = process.env.RECENT_GAME_URL + "?key=" + process.env.STEAM_API_KEY + "&steamid=" + steamid;
        let data = await axios.get(url).then(res => res.data.response).catch(err => reject(err));
        return resolve(data);
    });
}
/**
 * Include all dependencies
 */

const axios = require('axios');
const MarketItem = require('../models/MarketItem');
const validator = require('../util/validator');


/**
 * Gets all item by appid
 * @param {Object} params 
 */

module.exports.getMarketItem = params => {
    return new Promise(async(resolve, reject) => {
        let appid = params['appid'];
        let gameItemUrl = params['url'];
        let range = params['range'] || 100;
        let page = params['page'] || 1;
        let start = (page - 1) * range;

        let validate = {
            'appid': appid,
            'gameItemUrl': gameItemUrl
        };

        let invalid = validator.checkArgValidity(validate);
        if (invalid) reject(`Invalid ${invalid} provided: ${validate[invalid]}`);

        let baseUrl = `${gameItemUrl}${appid}&count=${range}&start=${start}`;
        console.log(baseUrl);

        const result = await axios.get(baseUrl)
            .then(res => res.data)
            .catch(err => reject(err));

        console.log(result);
        let count = result.total_count;
        var items = []

        if (count === undefined && count === 0) reject('This Steam user has no game: ' + steamid);

        for (var i = 0; i < range; i++)
            items.push(MarketItem.constructModel(result.results[i]))

        resolve(count > 0 ? { total: count, content: items } : { error: 'This game has no market items.' });
    });
};
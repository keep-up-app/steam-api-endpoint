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

module.exports.getMarketItem = async(params) => {
    return new Promise((resolve, reject) => {
        let appid = params['appid'];
        let count = params['count'] || 100;

        let validate = {
            'appid': appid,
            'count': count
        };

        let invalid = validator.checkArgValidity(validate);
        if (invalid) reject(`Invalid ${invalid} provided: ${validate[invalid]}`);


    });
};
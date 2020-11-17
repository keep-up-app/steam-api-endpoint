/**
 * Include all dependencies
 */

const axios = require('axios');
const validator = require('../util/validator');
const SteamProfile = require('../models/SteamProfile');

module.exports = {
    getProfile
}


/**
 * Gets user prfile by Steamid
 * 
 * @param {String} steamid
 */

function getProfile(steamid) {
    return new Promise(async(resolve, reject) => {
        let invSteamId = validator.checkArgValidity({ steamid });
        if (invSteamId) return reject('Invalid SteamID: ' + steamid);
        
        let url = `${process.env.STEAM_PROFILE_URL}?key=${process.env.STEAM_API_KEY}&steamids=${steamid}`
        let res = await axios.get(url);
        let profile = res.data.response.players[0];
        
        let model = SteamProfile.constructModel(profile);
        return resolve(model);
    });
} 
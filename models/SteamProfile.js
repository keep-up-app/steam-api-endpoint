/**
 * Include all dependecies 
 */

const format = require('../util/format');


/**
 * Construct Item model from Steam json data
 * 
 * @param {Object} json 
 */

module.exports.constructModel = data => {
    let steamid = data.steamid;
    let username = data.personaname;
    let last_online = format.getTimeSince(data.lastlogoff * 1000) + ' ago';
    let created_at = {
        'date': new Date(data.timecreated * 1000).toDateString(),
        'duration': format.getTimeSince(data.timecreated * 1000) + ' ago'
    };
    let avatar = {
        'small': data.avatar,
        'medium': data.avatarmedium,
        'large': data.avatarfull
    };
    let status = {
        'text': format.getStatus(data.personastate),
        'code': data.personastate
    }

    return {
        steamid,
        username,
        last_online,
        created_at,
        avatar,
        status
    }
}



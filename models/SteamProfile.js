/**
 * Include all dependecies 
 */

const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');
TimeAgo.locale(en)
timeAgo = new TimeAgo('en-US');


/**
 * Construct Item model from Steam json data
 * 
 * @param {Object} json 
 */

module.exports.constructModel = data => {
    let steamid = data.steamid;
    let username = data.personaname;
    let last_online = timeAgo.format(new Date(data.lastlogoff * 1000));
    let created_at = {
        'date': new Date(data.timecreated * 1000).toDateString(),
        'duration': timeAgo.format(new Date(data.timecreated * 1000))
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
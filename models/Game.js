/**
 * Construct Game model from Steam json data
 * 
 * @param {Object} json 
 */

module.exports.constructModel = data => {
    let name = data.name || 'Unknown';
    let appid = data.appid || 0;
    let playtime = Math.floor(data.playtime_forever / 60) || 0;
    let playtime_readable = readableTime(playtime * 3600);
    let logo = `${process.env.APP_LOGO_URL}/${appid}/${data.img_logo_url}.jpg` || null;
    let banner = `${process.env.APP_BANNER_URL}/${appid}/header.jpg` || null;

    return {
        name: name,
        appid: appid,
        playtime: playtime,
        cumulative_playtime: playtime_readable,
        logo: logo,
        banner: banner,
    };
};


/**
 * Convertes playtime in seconds to understandable test
 * 
 * @param {Int} time
 * @returns {String} time
 */

function readableTime(time = 0) {
    let periods = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade'];
    let durations = ['60', '60', '24', '7', '4.35', '12', '10'];
    let diff = time;

    var i = 0;
    for (i = 0; diff >= durations[i] && i < durations.length - 1; i++)
        diff /= durations[i];

    diff = Math.round(diff);
    if (diff > 1) periods[i] += 's';

    if (diff == 0) return 'Never Played';
    else return `${diff} ${periods[i]}`;
}
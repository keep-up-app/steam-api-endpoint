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
    let app_name = data.app_name || 'Unknown';
    let appid = data.asset_description.appid || 0;
    let app_icon = data.app_icon;
    let name = data.name || 'Unknown';
    let item_icon = `${process.env.ITEM_ICON_URL}/${data.asset_description.icon_url}`
    let volume = data.volume || 0;

    let price = data.sell_price || 0;
    let price_text = format.readablePrice(price);
    let price_median = data.median_price || 0;
    let price_lowest = data.lowest_price || 0;

    return {
        name,
        app_name,
        appid,
        app_icon,
        item_icon,
        volume,
        pricing: {
            current: price,
            text: price_text,
            median: price_median,
            lowest: price_lowest
        }
    };
};
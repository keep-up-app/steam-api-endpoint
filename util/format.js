/**
 * Used to construct standard object list pagination.
 * 
 * data = {
 *    content: {Object},   // content to paginate
 *    total: {Int}         // total amount of object
 * }
 * 
 * query = {
 *    'key1': Object
 *    'key2': [Object, Object, Object]
 * }
 * 
 * @param {String} baseUrl
 * @param {Object} data  // content
 * @param {Int} page
 * @param {Int} range
 * @param {Object} params
 * @returns {Object} JSON 
 */

function constructJSONPagination(baseUrl, data, page, range, params) {

    var json = null;

    const from = page * range - range;
    const to = from + data.content.length;
    const lastPage = (data.total - range > 0) ? Math.ceil(data.total / range) : null;
    const prevPage = page - 1 > 0 ? page - 1 : null;
    const nextPage = page + 1 <= lastPage ? page + 1 : null;

    const query = constructQuery(params);

    if (from <= data.total) {
        json = {
            data: data.content,
            links: {
                first: `${baseUrl}${query}page=1&range=${range}`,
                last: lastPage != null ? `${baseUrl}${query}page=${lastPage}&range=${range}` : null,
                prev: prevPage != null ? `${baseUrl}${query}page=${prevPage}&range=${range}` : null,
                next: nextPage != null ? `${baseUrl}${query}page=${nextPage}&range=${range}` : null
            },
            meta: {
                current_page: page,
                last_page: lastPage,
                from: from,
                to: to,
                current_on_page: to - from,
                total: data.total
            }
        };
    }

    return json.data.length == 0 ? { error: 'No match found...' } : json;
}

module.exports.constructJSONPagination = constructJSONPagination;


/**
 * Constructs query for url.
 * 
 * @param {Object} params 
 * @returns {String} query
 */

function constructQuery(params) {
    var query = '';
    if (params) {
        if (Object.keys(params).includes('param')) {
            query = '/';
            var values = params['param'];
            if (Array.isArray(values)) {
                for (var j = 0; j < values.length; j++)
                    query += `${values[j]}/`;
                console.log(query)
                query = query.slice(0, -1);
            } else query += `${values}`;
            delete params['param'];
            query += '?';
        }
        for (var i = 0; i < Object.keys(params).length; i++) {
            var key = Object.keys(params)[i];
            var values = Object.values(params)[i];
            if (Array.isArray(values)) query += `${key}=${Array.prototype.join.call(values, '+')}`
            else query += `${key}=${values}`;
            query += '&'
        }
        return query;
    }
    return '?';
}


/**
 * Convertes playtime in seconds to understandable test
 * 
 * @param {Int} time
 * @returns {String} time
 */

function readableTime(time = 0) {
    let periods = ['Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year', 'Decade'];
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

module.exports.readableTime = readableTime;


/**
 * Converts from Int to readable price (currency -> EUR)
 * 
 * @param {*} price 
 * @returns {String} readable
 */

function readablePrice(price) {
    price /= 100;
    if (price == 0) return 'Unavailable';
    else return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
}

module.exports.readablePrice = readablePrice;


/**
 * Helper function for finding readable status
 * 
 * @param {Int} statusCode
 * @returns {String} readable
 */

function getStatus(status) {
    switch (status) {
        case 0: return      'Offline'
        case 1: return      'Online'
        case 2: return      'Busy'
        case 3: return      'Away'
        case 4: return      'Snooze'
        case 5: return      'Looking to Trade'
        case 6: return      'Looking to Play'
        default: return     'Unknown' 
    }
}

module.exports.getStatus = getStatus;


/**
 * Get Time since from unix timstamp
 * 
 * @param {Int} time
 * @returns {String} time
 */

module.exports.getTimeSince = (time = 0) => {
    let periods = ['Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year', 'Decade'];
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
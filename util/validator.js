/**
 * Validator function to determing which inputted field is invalid.
 * Returns first invalid key
 * 
 * @param  {Object} fields 
 */

module.exports.checkArgValidity = fields => {
    for (var key in fields) {
        var field = fields[key];
        if ((field === undefined || field == "") || (key == 'steamid' && field.length != 17) || (key == 'appid' && !parseInt(Number(field))))
            return key;
    }
}
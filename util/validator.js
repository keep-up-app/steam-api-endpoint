/**
 * Validator function to determing which inputted field is invalid.
 * Returns first invalid key
 * 
 * @param  {Object} fields 
 */

module.exports.checkArgValidity = fields => {
    for (var key in fields) {
        var field = fields[key];
        if (field === undefined || field == "")
            return key;
        else if (key == 'steamid' && field.length != 17)
            return key;
        else if (key == 'appid' && !parseInt(Number(field)))
            return key;
    }
}
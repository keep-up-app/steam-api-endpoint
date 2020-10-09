/**
 * Include Steam Auth dependency
 */

const SteamAuth = require("node-steam-openid");

/**
 * Steam OpenID Authentication initialization
 */

module.exports = new SteamAuth({
    realm: "",
    returnUrl: "",
    apiKey: ""
});
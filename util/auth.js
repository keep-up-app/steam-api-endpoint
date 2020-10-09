/**
 * Include Steam Auth dependency
 */

const SteamAuth = require("node-steam-openid");

/**
 * Steam OpenID Authentication initialization
 */

module.exports = new SteamAuth({
    realm: `${process.env.INPUT_ENVKEY_BASE_URL}/steam/user/auth`,
    returnUrl: `${process.env.INPUT_ENVKEY_BASE_URL}/steam/user/auth`,
    apiKey: process.env.INPUT_ENVKEY_STEAM_API_KEY
});
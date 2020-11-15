/**
 * Include Steam Auth dependency
 */

const SteamAuth = require("node-steam-openid");

/**
 * Steam OpenID Authentication initialization
 */

module.exports = new SteamAuth({
    realm: `${process.env.BASE_URL}/steam/user/auth`,
    returnUrl: `${process.env.BASE_URL}/steam/user/authenticated`,
    apiKey: process.env.STEAM_API_KEY
});
/**
 * Include Steam Auth dependency
 */

const SteamAuth = require("node-steam-openid");

/**
 * Steam OpenID Authentication initialization
 */

module.exports = new SteamAuth({
    realm: `https://steam-api-endpoint.herokuapp.com//steam/user/auth`,
    returnUrl: `https://steam-api-endpoint.herokuapp.com//steam/user/auth`,
    apiKey: '3C928C31955258B04B76FCE7FDF70798'
});
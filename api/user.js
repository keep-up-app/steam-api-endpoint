/**
 * Include all dependencies
 */

const axios = require('axios');
const express = require("express");
const auth = require('../util/auth');
const router = express.Router();

module.exports = router;


/**
 * Redirects user to steam login page.
 * URI: /steam/user/auth
 * 
 * @method {GET}
 */

router.get('/auth', async(req, res) => {
    const redirectUrl = await auth.getRedirectUrl();
    return res.redirect(redirectUrl);
});


/**
 * Authenticate Used through OpenID and gets JSON Steam user Object
 * URI: /steam/user/authenticate
 * 
 * @method {GET}
 */

router.get('/authenticated', async(req, res) => {
    try {

        const user = await auth.authenticate(req);
        axios.post(`${process.env.USER_ENDPOINT}/steam/profile`, user)
            .catch(err => { console.error(err); });

        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});
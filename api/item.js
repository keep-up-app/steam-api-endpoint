/**
 * Include all dependencies
 */

const axios = require('axios');
const express = require("express");
const router = express.Router();

module.exports = router;

//https://steamcommunity.com/market/priceoverview?appid=252490&currency=3&market_hash_name=Pixel%20Garage%20Door


const itemIcon = `${process.env.ITEM_ICON_URL}/{icon_url}`;
const marketItems = `${process.env.GAME_MARKET_ITEM}{appid}&count=1000`;


router.get('/all', (req, res) => {
    axios.get('')
});
/**
 * Include all dependencies
 */

const marketItemController = require('../controllers/MarketItemController');
const format = require('../util/format');
const express = require("express");
const router = express.Router();

module.exports = router;


/**
 * Retrieves items from given Game with Id
 */

router.get('/all/:appid', async(req, res) => {

    let appid = req.params.appid;
    let page = parseInt(req.query.page != null ? req.query.page : 1);
    let range = parseInt(req.query.range != null ? req.query.range : 10);

    let data = await marketItemController.getMarketItem({
        appid: appid,
        url: process.env.GAME_MARKET_ITEMS,
        page: page,
        range: range
    }).catch(err => res.json({ error: err }));

    let baseUrl = `${process.env.BASE_URL}/steam/item/all/${appid}`;
    let json = format.constructJSONPagination(baseUrl, data, page, range);

    res.json(json);
});
/**
 * Include all dependencies
 */

const marketItemController = require('../controllers/MarketItemController');
const express = require("express");
const router = express.Router();

module.exports = router;

router.get('/:appid', async(req, res) => {

    let data = await marketItemController.getMarketItem({
        appid: req.params.appid
    }).catch(err => res.json({ error: err }));

    res.json(data);
});
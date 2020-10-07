/**
 * Include all dependencies
 */

const express = require("express");
const router = express.Router();
const SteamUser = require('../models/SteamUser');
const SteamItem = require('../models/SteamItem');
const steam = require('../server');


module.exports = router;
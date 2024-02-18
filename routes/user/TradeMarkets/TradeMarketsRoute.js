const express = require('express')
const route = express.Router();

const {TradeMarketsPrice, } = require('./../../../controller/user/TradeMarkets/TradeMarketsController');

route.get('/view',  TradeMarketsPrice);


module.exports = route;
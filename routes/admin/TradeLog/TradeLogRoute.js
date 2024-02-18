const express = require('express')
const route = express.Router();

const {AdminTradeLogAll, AdminTradeLogWin, AdminTradeLogLoss, AdminTradeLogDraw, } = require('../../../controller/admin/TradeLog/TradeLogController');

// Thrade App Store section 
route.get('/all',  AdminTradeLogAll);
route.get('/win',  AdminTradeLogWin);
route.get('/loss',  AdminTradeLogLoss);
route.get('/draw',  AdminTradeLogDraw);

module.exports = route;
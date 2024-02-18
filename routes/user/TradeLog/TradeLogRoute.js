const express = require('express')
const route = express.Router();

const {TradeLogStore, TradeLogHistory, TradeLogSingleView} = require('./../../../controller/user/TradeLogController');

route.post('/store',  TradeLogStore);
route.get('/history/:id',  TradeLogHistory);
route.get('/single/view/:id',  TradeLogSingleView);


module.exports = route;
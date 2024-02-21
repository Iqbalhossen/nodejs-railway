const express = require('express')
const route = express.Router();

const {TradeLogStore, TradeLogHistory, TradeLogSingleView, TradeLogLimitView} = require('./../../../controller/user/TradeLogController');

route.post('/store',  TradeLogStore);
route.get('/history/:id',  TradeLogHistory);
route.get('/single/view/:id',  TradeLogSingleView);
route.get('/history/limit/view/:id',  TradeLogLimitView);


module.exports = route;
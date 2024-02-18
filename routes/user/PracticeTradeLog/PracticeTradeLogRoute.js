const express = require('express')
const route = express.Router();

const {PracticeTradeLogStore, PracticeTradeLogHistory, PracticeTradeLogSingleView} = require('./../../../controller/user/PracticeTradeLog/PracticeTradeLogController');

route.post('/store',  PracticeTradeLogStore);
route.get('/history/:id',  PracticeTradeLogHistory);
route.get('/single/view/:id',  PracticeTradeLogSingleView);


module.exports = route;
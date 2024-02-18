const express = require('express')
const route = express.Router();

const {AdminPracticeTradeLogAll, AdminPracticeTradeLogWin, AdminPracticeTradeLogLoss, AdminPracticeTradeLogDraw, } = require('../../../controller/admin/PracticeTradeLog/PracticeTradeLogController');

// Thrade App Store section 
route.get('/all',  AdminPracticeTradeLogAll);
route.get('/win',  AdminPracticeTradeLogWin);
route.get('/loss',  AdminPracticeTradeLogLoss);
route.get('/draw',  AdminPracticeTradeLogDraw);

module.exports = route;
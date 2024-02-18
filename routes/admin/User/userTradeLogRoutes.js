const express = require('express')
const route = express.Router();

const {AdminUserTradeLogView, AdminUserTradeLogWinView, AdminUserTradeLogLossView, AdminUserTradeLogDrawView} = require('../../../controller/admin/User/adminUserTradeLogController');

// Thrade App Store section 
route.get('/all/:id',  AdminUserTradeLogView);
route.get('/win/:id',  AdminUserTradeLogWinView);
route.get('/loss/:id',  AdminUserTradeLogLossView);
route.get('/draw/:id',  AdminUserTradeLogDrawView);


module.exports = route;
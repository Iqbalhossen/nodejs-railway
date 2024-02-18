const express = require('express')
const route = express.Router();

const {AdminTransactionsViewByUserId} = require('../../../controller/admin/Transactions/TransactionsController');

// Thrade App Store section 
route.get('/view/:id',  AdminTransactionsViewByUserId);


module.exports = route;
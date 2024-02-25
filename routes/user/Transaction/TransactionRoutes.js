const express = require('express')
const route = express.Router();

const {UserTransactionView, } = require('./../../../controller/user/Transaction/TransactionController');

route.get('/view/:id',  UserTransactionView);


module.exports = route;
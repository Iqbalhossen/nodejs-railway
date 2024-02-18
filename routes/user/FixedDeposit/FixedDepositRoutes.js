const express = require('express')
const route = express.Router();

const {UserFixedDepositView, UserFixedDepositSingleView, UserFixedDepositStore, UserFixedDepositStoreView} = require('./../../../controller/user/FixedDeposit/FixedDepositController');

route.get('/view',  UserFixedDepositView);
route.get('/view/:id',  UserFixedDepositSingleView);
route.post('/store/:id',  UserFixedDepositStore);
route.get('/store/view/:id',  UserFixedDepositStoreView);



module.exports = route;
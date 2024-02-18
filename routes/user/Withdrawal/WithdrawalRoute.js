const express = require('express')
const route = express.Router();

const {WithdrawalStore, WithdrawalMethodView, WithdrawalAmountCheck, WithdrawalView} = require('./../../../controller/user/Withdrawal/WithdrawalController');

route.get('/view/:id',  WithdrawalView);
route.get('/method/view',  WithdrawalMethodView);
route.post('/amount/check',  WithdrawalAmountCheck);
route.post('/confirm',  WithdrawalStore);


module.exports = route;
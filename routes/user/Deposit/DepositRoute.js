const express = require('express')
const route = express.Router();

const {UserAvailabeBalance, UserDepositAllView} = require('./../../../controller/user/Deposit/DepositController');

route.get('/all/view/:user_id',  UserDepositAllView);
route.get('/available/balance/:user_id',  UserAvailabeBalance);


module.exports = route;
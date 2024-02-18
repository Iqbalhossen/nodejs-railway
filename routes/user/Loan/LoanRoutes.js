const express = require('express')
const route = express.Router();



const {UserLoanView, UserLoanStore, UserLoanHistory   } = require('../../../controller/user/Loan/LoanController');

route.get('/view',  UserLoanView);
route.post('/store/:id',   UserLoanStore);
route.get('/history/:id',   UserLoanHistory);


module.exports = route;
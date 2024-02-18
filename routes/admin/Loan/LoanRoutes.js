const express = require('express')
const route = express.Router();

const {AdminLoanPendingView, AdminLoanAccept, AdminLoanSingleView, AdminLoanReject   } = require('../../../controller/admin/Loan/LoanController');

route.get('/pending/view',  AdminLoanPendingView);
route.get('/view/:id',  AdminLoanSingleView);
route.put('/accept/:id',   AdminLoanAccept);
route.put('/reject/:id',   AdminLoanReject);


module.exports = route;
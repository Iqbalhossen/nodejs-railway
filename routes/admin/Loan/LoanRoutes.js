const express = require('express')
const route = express.Router();

const {AdminLoanPendingView, AdminLoanAccept, AdminLoanSingleView, AdminLoanReject, AdminLoanRejectView, AdminLoanApprovedView, AdminLoanCompletedView   } = require('../../../controller/admin/Loan/LoanController');

route.get('/pending/view',  AdminLoanPendingView);
route.get('/view/:id',  AdminLoanSingleView);
route.put('/accept/:id',   AdminLoanAccept);
route.put('/reject/:id',   AdminLoanReject);
route.get('/reject/view',   AdminLoanRejectView);
route.get('/approved/view',   AdminLoanApprovedView);
route.get('/completed/view',   AdminLoanCompletedView);


module.exports = route;
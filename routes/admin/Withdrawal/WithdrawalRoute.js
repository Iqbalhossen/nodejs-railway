const express = require('express')
const route = express.Router();

const {AdminWithdrawalMethodsView, AdminWithdrawalMethodsAdd, AdminWithdrawalMethodsInableDisable, AdminWithdrawalMethodsDelete, AdminWithdrawalMethodsEdit, AdminWithdrawalMethodsUpdate, AdminWithdrawalAllView, AdminWithdrawalSingleViewById, AdminWithdrawalAccept, AdminWithdrawalReject, AdminWithdrawalPendingView, AdminWithdrawalAcceptView, AdminWithdrawalRejectView, AdminWithdrawalHistoryView} = require('../../../controller/admin/Withdrawal/WithdrawalsController');

route.get('/methods/view',  AdminWithdrawalMethodsView);
route.post('/methods/store',  AdminWithdrawalMethodsAdd);
route.get('/methods/edit/:id',  AdminWithdrawalMethodsEdit);
route.put('/methods/update/:id',  AdminWithdrawalMethodsUpdate);
route.put('/methods/enable/disable/:id',  AdminWithdrawalMethodsInableDisable);
route.delete('/methods/delete/:id',  AdminWithdrawalMethodsDelete);


route.get('/all/view',  AdminWithdrawalAllView);
route.get('/pending',  AdminWithdrawalPendingView);
route.get('/accept',  AdminWithdrawalAcceptView);
route.get('/reject',  AdminWithdrawalRejectView);
route.get('/single/view/:id',  AdminWithdrawalSingleViewById);
route.put('/accept/:id',  AdminWithdrawalAccept);
route.put('/reject/:id',  AdminWithdrawalReject);

// history 

route.get('/history/:id',  AdminWithdrawalHistoryView);
module.exports = route;
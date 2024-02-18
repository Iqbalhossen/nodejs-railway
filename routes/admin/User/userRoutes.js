const express = require('express')
const route = express.Router();

const {AdminAllUserView, AdminUserViewById, AdminUserBanned, AdminUseEmailUnverify, AdminUseHistoryDetails, AdminUserBalanceAdd, AdminUserBalanceSubtract, AdminUserUpdateById, AdminUseMobileUnverify, AdminUseKYCUnverify, AdminUseWithBalance, AdminUseKYCPending, AdminUserBannedByID, AdminUserLoginHistory} = require('../../../controller/admin/User/adminUserController');

// Thrade App Store section 
route.get('/all',  AdminAllUserView);
route.get('/single/:id',  AdminUserViewById);
route.get('/banned',  AdminUserBanned);
route.put('/banned/:id',  AdminUserBannedByID);
route.get('/unverify/email',  AdminUseEmailUnverify);
route.get('/unverify/mobile',  AdminUseMobileUnverify);
route.get('/unverify/kyc',  AdminUseKYCUnverify);
route.get('/with/balance',  AdminUseWithBalance);
route.get('/kyc/pending',  AdminUseKYCPending);
route.get('/history/view/:id',  AdminUseHistoryDetails);
route.post('/balance/add',  AdminUserBalanceAdd);
route.post('/balance/subtract',  AdminUserBalanceSubtract);
route.put('/update/by/:id',  AdminUserUpdateById);
route.get('/login/history/:id',  AdminUserLoginHistory);

module.exports = route;
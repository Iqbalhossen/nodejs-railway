const express = require('express')
const route = express.Router();

const {AdminKYCPendingView, AdminKYCDetailsView, AdminKYAccept, AdminKYCReject, AdminKYCDetailsByUserId} = require('../../../controller/admin/KYC/KYCController');

// Thrade App Store section 
route.get('/pending',  AdminKYCPendingView);
route.get('/details/:id',  AdminKYCDetailsView);
route.get('/details/by/user/:id',  AdminKYCDetailsByUserId);
route.put('/accept/:id',  AdminKYAccept);
route.put('/reject/:id',  AdminKYCReject);

module.exports = route;
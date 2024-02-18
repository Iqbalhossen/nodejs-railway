const express = require('express')
const route = express.Router();

const {AdminManualGatewaysView, AdminManualGatewaysAdd, AdminManualGatewaysInableDisable, AdminManualGatewaysDelete, AdminManualGatewaysEdit, AdminManualGatewaysUpdate } = require('../../../controller/admin/PaymentGateways/ManualGatewayController');

// Thrade App Store section 
route.get('/view',  AdminManualGatewaysView);
route.post('/store',  AdminManualGatewaysAdd);
route.get('/edit/:id',  AdminManualGatewaysEdit);
route.put('/update/:id',  AdminManualGatewaysUpdate);
route.put('/enable/disable/:id',  AdminManualGatewaysInableDisable);
route.delete('/delete/:id',  AdminManualGatewaysDelete);

module.exports = route;
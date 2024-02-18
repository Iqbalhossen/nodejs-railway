const express = require('express')
const route = express.Router();


const { AdminReportView} = require('../../../controller/admin/Report/ReportController');
// Menu section 
route.get('/view',  AdminReportView);


module.exports = route;
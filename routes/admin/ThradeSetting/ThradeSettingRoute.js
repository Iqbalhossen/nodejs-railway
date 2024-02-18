const express = require('express')
const route = express.Router();

const {AdminThradeSettingView, AdminThradeSettingAdd, AdminThradeSettingDelete, AdminThradeSettingUpdate} = require('../../../controller/admin/ThradeSetting/ThradeSettingController');

// Thrade App Store section 
route.get('/view',  AdminThradeSettingView);
route.post('/store',  AdminThradeSettingAdd);

route.put('/update/:id',    AdminThradeSettingUpdate);
route.delete('/delete/:id',  AdminThradeSettingDelete);
module.exports = route;
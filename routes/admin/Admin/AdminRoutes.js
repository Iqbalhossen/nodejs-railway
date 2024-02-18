const express = require('express')
const route = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});


const {AdminRoleView, AdminRoleStore, AdminRoleViewById, AdminRoleUpdate, AdminRoleDelete, AdminDashboardView, AdminLogin, AdminPasswordForGet, AdminPasswordReset, AdminProfileUpdate, AdminPasswordUpdate} = require('../../../controller/admin/Admin/AdminController');

// Thrade App Store section 
route.get('/role/view',  AdminRoleView);
route.post('/role/store', AdminRoleStore);
route.get('/role/view/:id', AdminRoleViewById);
route.put('/role/update/:id', AdminRoleUpdate);
route.delete('/role/delete/:id', AdminRoleDelete);
route.get('/dashboard/view', AdminDashboardView);
route.post('/login', AdminLogin);
route.post('/passowrd/forget', AdminPasswordForGet);
route.post('/passowrd/reset/:id/:token', AdminPasswordReset);
route.put('/profile/update/:id',  upload.single('image'), AdminProfileUpdate);
route.put('/password/update/:id',  AdminPasswordUpdate);

module.exports = route;
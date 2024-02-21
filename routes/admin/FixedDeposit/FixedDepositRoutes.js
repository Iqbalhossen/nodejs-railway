const express = require('express')
const route = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});


const {AdminFixedDepositView, AdminFixedDepositStore, AdminFixedDepositSingleView, AdminFixedDepositUpdate, AdminFixedDepositDelete, AdminFixedDepositExpiredView, AdminFixedDepositAllView, AdminUserFixedDepositRunningView, AdminUserFixedDepositCompleteView, AdminUserFixedDepositAllView} = require('../../../controller/admin/FixedDeposit/FixedDepositController');

route.get('/view',  AdminFixedDepositView);
route.post('/store',  upload.single('image'), AdminFixedDepositStore);
route.get('/view/:id',   AdminFixedDepositSingleView);
route.put('/update/:id',  upload.single('image'), AdminFixedDepositUpdate);
route.delete('/delete/:id',   AdminFixedDepositDelete);
route.get('/expired/view',   AdminFixedDepositExpiredView);
route.get('/all/view',   AdminFixedDepositAllView);
route.get('/user/running/view',   AdminUserFixedDepositRunningView);
route.get('/user/complete/view',   AdminUserFixedDepositCompleteView);
route.get('/user/all/view',   AdminUserFixedDepositAllView);
 
module.exports = route;
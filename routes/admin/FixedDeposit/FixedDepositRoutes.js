const express = require('express')
const route = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});


const {AdminFixedDepositView, AdminFixedDepositStore, AdminFixedDepositSingleView, AdminFixedDepositUpdate, AdminFixedDepositDelete} = require('../../../controller/admin/FixedDeposit/FixedDepositController');

route.get('/view',  AdminFixedDepositView);
route.post('/store',  upload.single('image'), AdminFixedDepositStore);
route.get('/view/:id',   AdminFixedDepositSingleView);
route.put('/update/:id',  upload.single('image'), AdminFixedDepositUpdate);
route.delete('/delete/:id',   AdminFixedDepositDelete);

module.exports = route;
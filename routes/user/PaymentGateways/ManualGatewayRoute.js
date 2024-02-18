const express = require('express')
const route = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage});

const {UserManualGatewaysView, UserManualGatewaysViewById, UserManualGatewaysDeposit, UserManualGatewaysDepositView} = require('./../../../controller/user/PaymentGateways/ManualGatewaysController');


route.get('/view',  UserManualGatewaysView);
route.get('/view/:id',  UserManualGatewaysViewById);
route.post('/deposit/store', upload.single('screenshot'),   UserManualGatewaysDeposit);
route.get('/all/view/:id',  UserManualGatewaysDepositView);



module.exports = route;
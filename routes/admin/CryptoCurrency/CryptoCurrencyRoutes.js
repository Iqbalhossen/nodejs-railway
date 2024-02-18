const express = require('express')
const route = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

const {AdminCryptoCurrencyView, AdminCryptoCurrencyAdd, AdminCryptoCurrencyInableDisable, AdminCryptoCurrencyDelete, AdminCryptoCurrencyUpdate, AdminCryptoCurrencySingleView} = require('../../../controller/admin/CryptoCurrency/CryptoCurrencyController');

// Thrade App Store section 
route.get('/view',  AdminCryptoCurrencyView);
route.post('/store', upload.single('image'),  AdminCryptoCurrencyAdd);
// route.get('/edit/:id',  AdminCryptoCurrencyEdit);
route.put('/update/:id',  upload.single('image'),  AdminCryptoCurrencyUpdate);
route.put('/enable/disable/:id',  AdminCryptoCurrencyInableDisable);
route.delete('/delete/:id',  AdminCryptoCurrencyDelete);

route.get('/single/view/:id',  AdminCryptoCurrencySingleView);
module.exports = route;
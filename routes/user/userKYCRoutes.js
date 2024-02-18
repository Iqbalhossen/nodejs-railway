const express = require('express')
const route = express.Router();
const {imageUpload} = require('./../../helpers/filehelper');
const {UserKYCStore, UserKYCView} = require('./../../controller/user/userKYCController');

route.post('/store', imageUpload.fields([{ name: 'front_page_img', maxCount: 1 }, { name: 'back_page_img', maxCount: 1 }]),  UserKYCStore);
route.get('/view/:id',  UserKYCView);


module.exports = route;
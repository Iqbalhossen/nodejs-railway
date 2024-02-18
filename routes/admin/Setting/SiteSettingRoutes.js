const express = require('express')
const route = express.Router();
const multer = require('multer')
const {imageUpload} = require('../../../helpers/filehelper');
const storage = multer.memoryStorage();
const upload = multer({storage});

const {FooterUpdate , HeaderUpdate, NewsletterUpdate, SocialSupportView, SocialSupportStore} = require('../../../controller/admin/Setting/SiteSettingController');
// Menu section 
route.post('/footer/store', upload.single('logo'),  FooterUpdate);
route.post('/header/store', upload.single('logo'),  HeaderUpdate);
route.post('/newsletter/store',  NewsletterUpdate);
route.get('/social/support/view',  SocialSupportView);
route.post('/social/support/store',  SocialSupportStore);


module.exports = route;
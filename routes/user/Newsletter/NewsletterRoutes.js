const express = require('express')
const route = express.Router();

const {NewsletterStore} = require('./../../../controller/user/Newsletter/NewsletterController');

route.post('/store',  NewsletterStore);



module.exports = route;
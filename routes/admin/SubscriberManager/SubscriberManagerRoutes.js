const express = require('express')
const route = express.Router();

const {SubscriberManagerView, SubscriberManagerDelete, SubscriberManagerEmailSend} = require('./../../../controller/admin/SubscriberManager/SubscriberManagerController');

route.get('/view',  SubscriberManagerView);
route.delete('/delete/:id',  SubscriberManagerDelete);
route.post('/email/send',  SubscriberManagerEmailSend);



module.exports = route;
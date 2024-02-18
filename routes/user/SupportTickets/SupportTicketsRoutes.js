const express = require('express')
const route = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});


const {UserSupportTicketsStore, UserSupportTicketsView, UserSupportTicketsViewById, UserSupportTicketsReplay, UserSupportTicketsMessageView, UserSupportTicketsFileiew} = require('./../../../controller/user/SupportTickets/SupportTicketsController');

route.post('/store/:id', upload.single('image'),   UserSupportTicketsStore);
route.get('/view/:id',   UserSupportTicketsView);
route.get('/view/by/id/:id',   UserSupportTicketsViewById);
route.post('/replay/:id',  upload.single('image'),  UserSupportTicketsReplay);
route.get('/message/view/:id',   UserSupportTicketsMessageView);
route.get('/file/view/:id',   UserSupportTicketsFileiew);


module.exports = route;
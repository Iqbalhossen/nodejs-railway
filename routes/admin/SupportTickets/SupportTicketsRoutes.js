const express = require('express')
const route = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});


const {AdminSupportTicketsPending, AdminSupportTicketsDetails, AdminSupportTicketsFile, AdminSupportTicketsMessageStore, AdminSupportTicketsMessageDelete, AdminSupportTicketsClose, AdminSupportTicketsCloseView, AdminSupportTicketsAnsweredView, AdminSupportTicketsAllView} = require('./../../../controller/admin/SupportTickets/SupportTicketsController');

// route.post('/store/:id', upload.single('image'),   AdminSupportTicketsStore);
route.get('/view',   AdminSupportTicketsPending);
route.get('/view/details/:id',   AdminSupportTicketsDetails);
route.get('/file/view/:id',   AdminSupportTicketsFile);
route.post('/message/:id', upload.single('image'),  AdminSupportTicketsMessageStore);
route.delete('/message/delete/:id',   AdminSupportTicketsMessageDelete);
route.put('/close/:id',   AdminSupportTicketsClose);
route.get('/close/view',   AdminSupportTicketsCloseView);
route.get('/answered/view',   AdminSupportTicketsAnsweredView);
route.get('/all/view',   AdminSupportTicketsAllView);



module.exports = route;
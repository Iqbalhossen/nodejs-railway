const express = require('express')
const route = express.Router();

const {AdminConversationView, MessageView, MessageSend} = require('./../../../controller/LiveChatControllers/chatControllers');

route.get('/conversation/view',  AdminConversationView);
route.get('/messgae/view/:id',  MessageView);
route.post('/messgae/send/:id',  MessageSend);



module.exports = route;
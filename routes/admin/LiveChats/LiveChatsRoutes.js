const express = require('express')
const route = express.Router();

const {AdminConversationView, AdminPendingLiveChatView, AdminSingleLiveChatView, AdminSingleMessageView, AdminApprovedChating, AdminCloseChating, AdminAllConversationView, AdminConversationMessageView} = require('./../../../controller/admin/LiveChats/LiveChatsController');

route.get('/conversation/view/:id',  AdminConversationView);
route.get('/pending/view',  AdminPendingLiveChatView);
route.get('/single/view/:id',  AdminSingleLiveChatView);
route.get('/single/message/view/:id',  AdminSingleMessageView);
route.put('/approved/chating/:id/:adminId',  AdminApprovedChating);
route.put('/close/chating/:id',  AdminCloseChating);
route.get('/all/conversation/view',  AdminAllConversationView);
route.get('/conversation/message/view/:id',  AdminConversationMessageView);



module.exports = route;
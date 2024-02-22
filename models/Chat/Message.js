const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String,
        default: null,
    }, 
    sender_email: {
        type: String 
    },
    recevier_email: {
        type: String,
        default: null,
    },
    message: {
        type: String
    }
},
{ timestamps: true }
);

const Messages = mongoose.model('Message', messageSchema);

module.exports = Messages;
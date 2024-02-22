const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    fname: {
        type: String,
        default: null,
    },
    lname: {
        type: String,
        default: null,
    },
    user_email: {
        type: String,
        default: null,
    },
    adminId: {
        type: String,
        default: null,
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    status: {
        type: Number,
        default: 0,
    },
 
},
    { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
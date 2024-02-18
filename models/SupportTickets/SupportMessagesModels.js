
const mongoose = require('mongoose'); // Erase if already required

var SupportMessagesSchema = new mongoose.Schema({
    support_ticket_id:{
        type:String,
        required:true,
         
    },
    admin_id:{
        type:String,
        default: null,
    },
    message:{
        type:String,         
    },
    created_at:{
        type:Date,
        default: Date.now,
         
    },
    
});


module.exports = mongoose.model('SupportMessages', SupportMessagesSchema);
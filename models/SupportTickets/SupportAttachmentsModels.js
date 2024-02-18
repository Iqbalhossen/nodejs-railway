
const mongoose = require('mongoose'); // Erase if already required

var SupportAttachmentsSchema = new mongoose.Schema({
    support_message_id:{
        type:String,
        required:true,
         
    },
    attachment:{
        type:String,
    },
 
    created_at:{
        type:Date,
        default: Date.now,
         
    },
    
});


module.exports = mongoose.model('SupportAttachments', SupportAttachmentsSchema);
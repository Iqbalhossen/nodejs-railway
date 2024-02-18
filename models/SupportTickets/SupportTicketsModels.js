
const mongoose = require('mongoose'); // Erase if already required

var SupportTicketsSchema = new mongoose.Schema({
    user_id:{
        type:String, 
        default:null        
    },
    name:{
        type:String,
    },
    email:{
        type:String,         
    },
    ticket:{
        type:Number,         
    },
    subject:{
        type:String,         
    },
    status:{
        type:Number,  
        default:0       
    },
    priority:{
        type:Number,
        default:0         
    },
    last_reply:{
        type:Date,         
    },
    created_at:{
        type:Date,
        default: Date.now,
         
    },
    
});


module.exports = mongoose.model('SupportTickets', SupportTicketsSchema);

const mongoose = require('mongoose'); // Erase if already required

var WithdrawalSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
         
    }, 
    GatewayName:{
        type:String,
        required:true,
         
    },
    Transaction:{
        type:String,
         
    },
    Amount:{
        type:Number,         
    },
    AmountWithVat:{
        type:Number,         
    },
    MinimumAmount:{
        type:Number,         
    },
    MaximumAmount:{
        type:Number,         
    },

    Conversion:{
        type:Number,
         
    },
    WithdrawalAddress:{
        type:String,
         
    },   
    NetworkType:{
        type:String,
         
    },   
    Status:{
        type:Number,
         
    },
    Created_At:{
        type:Date,
        default: Date.now,
         
    },
    
});


module.exports = mongoose.model('Withdrawal', WithdrawalSchema);

const mongoose = require('mongoose'); // Erase if already required

var DepositSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
         
    },
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

    Conversion:{
        type:String,
         
    },
    screenshot:{
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


module.exports = mongoose.model('Deposit', DepositSchema);
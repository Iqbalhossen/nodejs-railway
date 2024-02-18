
const mongoose = require('mongoose'); // Erase if already required

var WithdrawalMethodsSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
         
    },
    Currency:{
        type:String,
        required:true,
         
    },
    NetworkType:{
        type:String,         
    },
    Rate:{
        type:Number,
        required:true,
         
    },
    MinimumAmount:{
        type:Number,
        required:true,
         
    },
    MaximumAmount:{
        type:Number,
        required:true,
         
    },
    FixedCharge:{
        type:Number,
        required:true,
         
    },
    PercentCharge:{
        type:Number,
        required:true,
         
    },
    WithdrawInstruction:{
        type:String,
        required:true,
         
    },
    Status:{
        type:Number,
        required:true,
         
    },
    
});


module.exports = mongoose.model('WithdrawalMethods', WithdrawalMethodsSchema);
const mongoose = require('mongoose'); 

var TradeLogSchema = new mongoose.Schema({
    user_name:{
        type:String,
         
    },
    user_id:{
        type:String,
         
    },
    Crypto:{
        type:String,
    },
    Crypto_price:{
        type:Number,
    },
    Amount:{
        type:Number,
    },
    Result_Amount:{
        type:Number,
    },
    InTime:{
        type:Date,
    },
    HighLow:{
        type:String,
    },
    Result:{
        type:String,
    },
    Status:{
        type:Number,
    },
    OutTime:{
        type:Date,
    },
    Symbol:{
        type:String,
    },
    Time:{
        type:Number,
    },
    Unit:{
        type:String,
    },
    profit:{
        type:Number,
    },

});

module.exports = mongoose.model('TradeLog', TradeLogSchema);
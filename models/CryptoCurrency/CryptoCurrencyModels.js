
const mongoose = require('mongoose'); // Erase if already required

var CryptoCurrencySchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
         
    },
    Symbol:{
        type:String,
        required:true,
         
    },
    image:{
        type:String,         
    },
    Status:{
        type:Number,
        required:true,
         
    },
    created_at:{
        type:Date,
        default: Date.now,
         
    },
    
});


module.exports = mongoose.model('CryptoCurrency', CryptoCurrencySchema);

const mongoose = require('mongoose'); // Erase if already required

var CryptocurrenciesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
         
    }, 
    created_at:{
        type:String,
        required:true,
    },
    update_at:{
        type:String,
    },
});


module.exports = mongoose.model('CryptocurrenciesModel', CryptocurrenciesSchema);
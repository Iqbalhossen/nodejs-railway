
const mongoose = require('mongoose'); // Erase if already required

var FooterSchema = new mongoose.Schema({
    logo:{
        type:String,
        required:true,
         
    },
    dis:{
        type:String,
        required:true,
         
    },
    email:{
        type:String,
        required:true,
         
    },
    phone:{
        type:String,
        required:true,
         
    },
    address:{
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


module.exports = mongoose.model('FooterModels', FooterSchema);
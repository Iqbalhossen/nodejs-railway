
const mongoose = require('mongoose'); // Erase if already required

var Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
         
    },
    short_dis:{
        type:String,
        required:true,
    },
    long_dis:{
        type:String,
        required:true,
    },
    image_url:{
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


module.exports = mongoose.model('', Schema);

const mongoose = require('mongoose'); // Erase if already required

var GffexAppSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
         
    }, 
    dis:{
        type:String,
        required:true,
         
    }, 
    image:{
        type:String,
        required:true,
         
    }, 
    sub_title_one:{
        type:String,
        required:true,
         
    }, 
    sub_title_one_dis:{
        type:String,
        required:true,
         
    }, 
    sub_title_two:{
        type:String,
        required:true,
         
    }, 
    sub_title_two_dis:{
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


module.exports = mongoose.model('GffexAppModels', GffexAppSchema);
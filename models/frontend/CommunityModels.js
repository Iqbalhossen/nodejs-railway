
const mongoose = require('mongoose'); // Erase if already required

var CommunitySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
         
    }, 
    image:{
        type:String,
        required:true,
         
    }, 
    dis:{
        type:String,
        required:true,
         
    }, 
    Btn_one_name:{
        type:String,
        required:true,
         
    }, 
    Btn_one_icon:{
        type:String,
        required:true,
         
    }, 
    Btn_one_url:{
        type:String,
        required:true,
         
    }, 
    Btn_two_name:{
        type:String,
        required:true,
         
    }, 
    Btn_two_icon:{
        type:String,
        required:true,
         
    }, 
    Btn_two_url:{
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


module.exports = mongoose.model('CommunityModels', CommunitySchema);
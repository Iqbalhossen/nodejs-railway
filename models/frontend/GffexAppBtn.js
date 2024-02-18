
const mongoose = require('mongoose'); // Erase if already required

var GffexAppBtnSchema = new mongoose.Schema({
    btn_one_name:{
        type:String,
        required:true,
         
    }, 
    btn_one_icon:{
        type:String,
        required:true,
         
    }, 
    btn_one_url:{
        type:String,
        required:true,
         
    }, 
    btn_two_name:{
        type:String,
        required:true,
         
    }, 
    btn_two_icon:{
        type:String,
        required:true,
         
    }, 
    btn_two_url:{
        type:String,
        required:true,
         
    }, 
    btn_three_name:{
        type:String,
        required:true,
         
    }, 
    btn_three_icon:{
        type:String,
        required:true,
    },
    btn_three_url:{
        type:String,
    },
    created_at:{
        type:String,
        required:true,
    },
    update_at:{
        type:String,
    },
});


module.exports = mongoose.model('GffexAppBtnModels', GffexAppBtnSchema);
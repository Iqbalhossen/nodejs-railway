
const mongoose = require('mongoose'); // Erase if already required

var CommunityBtnSchema = new mongoose.Schema({
    btn_image:{
        type:String,
        required:true,
         
    }, 
    btn_url:{
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


module.exports = mongoose.model('CommunityBtnModels', CommunityBtnSchema);
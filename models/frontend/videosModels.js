
const mongoose = require('mongoose'); // Erase if already required

var VideosSchema = new mongoose.Schema({
    title_one:{
        type:String,
        required:true,
         
    },
    title_two:{
        type:String,
        required:true,
         
    },
    dis_one:{
        type:String,
        required:true,
         
    },
    dis_two:{
        type:String,
        required:true,
         
    },
    btn_name:{
        type:String,
        required:true,
         
    },
    btn_url:{
        type:String,
        required:true,
         
    },
    icon_one:{
        type:String,
        required:true,
         
    },
    icon_two:{
        type:String,
        required:true,
         
    },
    icon_three:{
        type:String,
        required:true,
         
    },
    icon_one_url:{
        type:String,
        required:true,
         
    },
    icon_two_url:{
        type:String,
        required:true,
         
    },
    icon_three_url:{
        type:String,
        required:true,
         
    },
    video_url:{
        type:Object,
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


module.exports = mongoose.model('Videos', VideosSchema);
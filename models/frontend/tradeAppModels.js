
const mongoose = require('mongoose'); // Erase if already required

var ThradeAppSchema = new mongoose.Schema({
    image_url:{
        type:String,
        required:true,
         
    },
    title_img_url_one:{
        type:String,
        required:true,
    },
    title_one:{
        type:String,
        required:true,
    },
    dis_one:{
        type:String,
        required:true,
    },
    title_img_url_two:{
        type:String,
        required:true,
    },
    title_two:{
        type:String,
        required:true,
    },
    dis_two:{
        type:String,
        required:true,
    },
    app_url:{
        type:String,
        required:true,
    },
    wondow_url:{
        type:String,
        required:true,
    },
    iphone_url:{
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


module.exports = mongoose.model('ThradeAppModels', ThradeAppSchema);
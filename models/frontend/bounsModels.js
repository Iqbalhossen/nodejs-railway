
const mongoose = require('mongoose'); // Erase if already required

var HomeBounsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
         
    },
    image_url:{
        type:String,
        required:true,
    },
    title_one:{
        type:String,
        required:true,
    },
    title_two:{
        type:String,
        required:true,
    },
    title_three:{
        type:String,
        required:true,
    },
    title_two_reward:{
        type:String,
    },
    dis_one:{
        type:String,
        required:true,
    },
    dis_two:{
        type:String,
        required:true,
    },
    dis_three:{
        type:String,
        required:true,
    },
    dis_one_btn:{
        type:String,
        required:true,
    },
    dis_one_btn_url:{
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


module.exports = mongoose.model('HomeBouns', HomeBounsSchema);
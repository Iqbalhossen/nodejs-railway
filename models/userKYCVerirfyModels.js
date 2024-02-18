const mongoose = require('mongoose'); 

var userKYCSchema = new mongoose.Schema({
    user_name:{
        type:String,
         
    },
    user_id:{
        type:String,
        required:true,
         
    },
    front_img:{
        type:String,
        required:true,
    },
    back_img:{
        type:String,
    },
    user_img:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    status:{
        type:Number,
    },
    created_at:{
        type:Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('UserKYC', userKYCSchema);
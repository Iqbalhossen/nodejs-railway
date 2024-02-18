
const mongoose = require('mongoose'); // Erase if already required

var SliderSchema = new mongoose.Schema({
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


module.exports = mongoose.model('SliderModel', SliderSchema);

const mongoose = require('mongoose'); // Erase if already required

var OurProductsTitleSchema = new mongoose.Schema({
    title:{
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


module.exports = mongoose.model('OurProductsTitleModel', OurProductsTitleSchema);

const mongoose = require('mongoose'); // Erase if already required

var NoticesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
         
    },
    notices_url:{
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


module.exports = mongoose.model('NoticesModel', NoticesSchema);
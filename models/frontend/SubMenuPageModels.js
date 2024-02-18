
const mongoose = require('mongoose'); // Erase if already required

var SubMenuPageSchema = new mongoose.Schema({
    submenu_id:{
        type:String,
        required:true,
         
    }, 
    id:{
        type:String,
        required:true,
         
    }, 
    name:{
        type:String,
        required:true,
         
    }, 
    filterId:{
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


module.exports = mongoose.model('SubMenuPageModel', SubMenuPageSchema);
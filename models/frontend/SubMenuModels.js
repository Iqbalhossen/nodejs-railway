
const mongoose = require('mongoose'); // Erase if already required

var SubMenuSchema = new mongoose.Schema({
    menu_id:{
        type:String,
        required:true,
         
    }, 
    name:{
        type:String,
        required:true,
         
    }, 
    slug:{
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


module.exports = mongoose.model('SubMenuModel', SubMenuSchema);
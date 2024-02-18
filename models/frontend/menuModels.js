
const mongoose = require('mongoose'); // Erase if already required

var MenuSchema = new mongoose.Schema({
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


module.exports = mongoose.model('MenuModel', MenuSchema);

const mongoose = require('mongoose'); // Erase if already required

var StartThradeBtnSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
         
    },
    url:{
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


module.exports = mongoose.model('StartThradeBtnModels', StartThradeBtnSchema);
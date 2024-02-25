
const mongoose = require('mongoose'); // Erase if already required

var HeaderSchema = new mongoose.Schema({
    logo:{
        type:String,
        required:true,
         
    },
    fav_icon:{
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
},
{ timestamps: true }
);


module.exports = mongoose.model('HeaderModels', HeaderSchema);

const mongoose = require('mongoose'); // Erase if already required

var NewListingSchema = new mongoose.Schema({
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
},
{ timestamps: true }
);


module.exports = mongoose.model('NewListingModel', NewListingSchema);

const mongoose = require('mongoose'); // Erase if already required

var NewsletterSchema = new mongoose.Schema({
    dis:{
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


module.exports = mongoose.model('NewsletterModels', NewsletterSchema);
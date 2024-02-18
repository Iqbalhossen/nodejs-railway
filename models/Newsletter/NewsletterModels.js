const mongoose = require('mongoose'); // Erase if already required

let NewsletterSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
         
    },
    created_at:{
        type:String,
        default: Date.now,       
    },
   
    
});


module.exports = mongoose.model('Newsletter', NewsletterSchema);
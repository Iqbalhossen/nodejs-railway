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
   
    
},
{ timestamps: true }
);


module.exports = mongoose.model('Newsletter', NewsletterSchema);
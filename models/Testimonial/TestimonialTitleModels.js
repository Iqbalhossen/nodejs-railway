
const mongoose = require('mongoose'); // Erase if already required

var TestimonialTitleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
         
    },
   
    
},
{ timestamps: true }
);


module.exports = mongoose.model('TestimonialTitle', TestimonialTitleSchema);
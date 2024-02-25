
const mongoose = require('mongoose'); // Erase if already required

var TestimonialSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
         
    },
    company:{
        type:String,
        required:true,
         
    },
    position:{
        type:String,
        required:true,
         
    },
    rating:{
        type:Number,         
    },
    dis:{
        type:String,         
    },
    image:{
        type:String,         
    },
  
},
{ timestamps: true }
);


module.exports = mongoose.model('Testimonial', TestimonialSchema);
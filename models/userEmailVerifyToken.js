
const mongoose = require('mongoose'); // Erase if already required

var userEmailVerifyTokenSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
         
    },
    verifiy_code:{
        type:String,
        required:true,
    },
});


module.exports = mongoose.model('userEmailVerifyToken', userEmailVerifyTokenSchema);
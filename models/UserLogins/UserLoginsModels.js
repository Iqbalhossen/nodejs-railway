const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var UserLoginsSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
         
    },
    user_id:{
        type:String,
        required:true,
    }, 
    created_at:{
        type:String,
        default: Date.now,
    },
   
});

//Export the model
module.exports = mongoose.model('UserLogins', UserLoginsSchema);


const mongoose = require('mongoose'); // Erase if already required

var ThradeSettingSchema = new mongoose.Schema({
    Time:{
        type:Number,
        required:true,
         
    },
    Profit:{
        type:Number,
        required:true,
         
    },
    Unit:{
        type:String,         
    },
    created_at:{
        type:Date,
        default: Date.now,
         
    },
    
});


module.exports = mongoose.model('ThradeSetting', ThradeSettingSchema);
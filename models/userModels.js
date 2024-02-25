const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
         
    }, 
    lname:{
        type:String,
        required:true,
         
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },

    country_code:{
        type:String,
        default:null
    },
    mobile:{
        type:Number,
        default:null,
    },
    ref_by:{
        type:String,
        default:null,
    },
    balance:{
        type:Number,
        default:0,
    },
    demo_balance:{
        type:Number,
        default:0,
    },
    first_profit:{
        type:Number,
        default:null
    },
    second_profit:{
        type:Number,
        default:null
    },
    third_profit:{
        type:Number,
        default:null
    },
    fourth_profit:{
        type:Number,
        default:null
    },
    trading_type:{
        type:String,
        default:null
    },
    address:{
        type:String,
    },
    city:{
        type:String,
        default:null,
    },
    state:{
        type:String,
        default:null,
    },
    zip_postal:{
        type:String,
        default:null,
    },
    country:{
        type:String,
        default:null,
    },
    kyc_data:{
        type:Boolean,
        default:false,
    },
    kv:{
        type:Boolean,
        default:false,
    },
    ev:{
        type:Boolean,
        default:false,
    },
    mv:{
        type:Boolean,
        default:false,
    },
    picture:{
        type:String,
        default:null,
    },
    ban_reason:{
        type:String,
        default:null,
    },
    is_verified:{
        type:Boolean,
        default:false,
    },
    status:{
        type:Number,
    },
    password:{
        type:String,
        required:true,
    },
    created_at:{
        type:String,
    },
   
},
{ timestamps: true }
);

//Export the model
module.exports = mongoose.model('User', userSchema);

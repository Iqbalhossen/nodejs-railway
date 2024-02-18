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
   
});

//Export the model
module.exports = mongoose.model('User', userSchema);








///////    user data


// 2	staff_id	
// 3	firstname	
// 4	lastname	
// 5	username 
// 6	email 
// 7	country_code	
// 8	mobile	
// 9	ref_by	
// 10	balance		
// 11	demo_balance	
// 12	first_profit		
// 13	second_profit	
// 14	third_profit		
// 15	fourth_profit		
// 16	trading_type		
// 17	password	
// 18	plain_password	
// 19	address	
// 20	status		
// 21	kyc_data	
// 22	kv	
// 23	ev
// 24	sv	
// 25	profile_complete	
// 26	ver_code	
// 27	ver_code_send_at
// 28	ts	
// 29	tv	
// 30	tsc		
// 31	ban_reason		
// 32	remember_token		
// 33	deleted_at	
// 34	created_at	
// 35	updated_at
const mongoose = require('mongoose'); // Erase if already required

var AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
         
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    picture:{
        type:String,
        default:null,
    },
    is_verified:{
        type:Boolean,
    },
    status:{
        type:Number,
        default:1,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:null,
    },
    EditororViewer:{
        type:String,
        default:"viewer",
    },
    KYC_setting:{
        type:Boolean,
        default:false,
    },
    crypto_currency:{
        type:Boolean,
        default:false,
    },
    dashboard:{
        type:Boolean,
        default:false,
    },
    deposits:{
        type:Boolean,
        default:false,
    },
    manage_page:{
        type:Boolean,
        default:false,
    },
    manage_section:{
        type:Boolean,
        default:false,
    },
    manage_staff:{
        type:Boolean,
        default:false,
    },
    manage_template:{
        type:Boolean,
        default:false,
    },
    manage_users:{
        type:Boolean,
        default:false,
    },
    notification_setting:{
        type:Boolean,
        default:false,
    },
    payment_gateways:{
        type:Boolean,
        default:false,
    },
    practice_trade_log:{
        type:Boolean,
        default:false,
    },
    report:{
        type:Boolean,
        default:false,
    },
    site_setting:{
        type:Boolean,
        default:false,
    },
    subscribers:{
        type:Boolean,
        default:false,
    },
    support_ticket:{
        type:Boolean,
        default:false,
    },
    trade_log:{
        type:Boolean,
        default:false,
    },
    trade_setting:{
        type:Boolean,
        default:false,
    },
    withdrawals:{
        type:Boolean,
        default:false,
    },
    created_at:{
        type:String,
    },
 
});


//Export the model
module.exports = mongoose.model('Admin', AdminSchema);
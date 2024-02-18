const mongoose = require('mongoose'); 

var TransactionsSchema = new mongoose.Schema({

    user_id:{
        type:String,        
    },
    amount:{
        type:Number,
        default:0.00,
    },
    charge:{
        type:Number,
        default:0.00,
    }, 
    post_balance:{
        type:Number,
        default:0.00,
    },
    trx_type:{
        type:String,
        default:null,
    },
    trx:{
        type:String,
        default:null,
    },
    details:{
        type:String,
        default:null,
    },
    remark:{
        type:String,
        default:null,
    }, 
    status:{
        type:Number,
        default:null,
    },

},
{ timestamps: true }
);

module.exports = mongoose.model('Transactions', TransactionsSchema);
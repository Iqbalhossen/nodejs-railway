
const mongoose = require('mongoose'); // Erase if already required

var LoanSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,

    },
    amount: {
        type: String,
        required: true,

    },
    percentage: {
        type: Number,
        default: 0,

    },
    interest_amount: {
        type: Number,
        default:0
    },
    expired_time: {
        type: String,
        default: null,
    },
    reason: {
        type: String,
        required: true,
    },
   
    status: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
);


module.exports = mongoose.model('Loan', LoanSchema);
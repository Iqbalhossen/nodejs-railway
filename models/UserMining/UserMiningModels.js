
const mongoose = require('mongoose'); // Erase if already required

let UserMiningSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,

    },
    promotion_name: {
        type: String,
        required: true,

    },
    name: {
        type: String,
        required: true,

    },
    amount: {
        type: Number,
        required: true,
    },
    period: {
        type: Number,
        required: true,
    },
    period_type: {
        type: String,
        required: true,
    },
    profit_amount: {
        type: Number,
        required: true,
    },
    expired_time: {
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


module.exports = mongoose.model('UserMining', UserMiningSchema);
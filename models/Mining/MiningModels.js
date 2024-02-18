
const mongoose = require('mongoose'); // Erase if already required

var MiningSchema = new mongoose.Schema({
    promotion_name: {
        type: String,
        required: true,

    },
    name: {
        type: String,
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
    profit: {
        type: Number,
        required: true,
    },
    expired_time: {
        type: Date,
        required: true,
    },
    min_amount: {
        type: Number,
        required: true,
    },
    max_amount: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    dis: {
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


module.exports = mongoose.model('Mining', MiningSchema);
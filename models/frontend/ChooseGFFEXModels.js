
const mongoose = require('mongoose'); // Erase if already required

var ChooseGFFEXSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    videos: {
        type: String,
        required: true,

    },
    icon_one: {
        type: String,
        required: true,

    },
    icon_one_dis: {
        type: String,
        required: true,

    },
    icon_two: {
        type: String,
        required: true,

    },
    icon_two_dis: {
        type: String,
        required: true,

    },
    icon_three: {
        type: String,
        required: true,

    },
    icon_three_dis: {
        type: String,
        required: true,

    },
    created_at: {
        type: String,
        required: true,
    },
    update_at: {
        type: String,
    },
});


module.exports = mongoose.model('ChooseGFFEXModel', ChooseGFFEXSchema);
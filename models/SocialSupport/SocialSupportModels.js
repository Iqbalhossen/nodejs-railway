
const mongoose = require('mongoose'); // Erase if already required

var SocialSupportSchema = new mongoose.Schema({
    whatapp_link: {
        type: String,
        required: true,

    },
    tele_link: {
        type: String,
        required: true,

    },
    messenger: {
        type: String,
        required: true,
    },

},
    { timestamps: true }
);


module.exports = mongoose.model('SocialSupport', SocialSupportSchema);
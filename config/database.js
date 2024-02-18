require('dotenv').config();
const { default: mongoose } = require('mongoose');

mongoose.set("strictQuery", false);

const database = () => {
    try {
        const database = mongoose.connect("mongodb+srv://Billing:billing@billingiqbal.atpv1gn.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('database connect New Version'))
            .catch((error) => console.log(error));

    } catch (error) {
        console.log("database error");
    }
}


module.exports = database;
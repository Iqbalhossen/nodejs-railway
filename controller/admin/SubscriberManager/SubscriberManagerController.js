const NewsletterModels = require('../../../models/Newsletter/NewsletterModels');
const { ObjectId } = require('mongodb');
const { SubscriberManagerEmail } = require('../../../commonfile/email/SubscriberManagerEmail');
const SubscriberManagerView = async (req, res) => {
    try {

        const data = await NewsletterModels.find();
        res.status(201).json({
            success: true,
            data,
        });

    } catch (error) {
        console.log(error);
    }
};

const SubscriberManagerDelete = async (req, res) => {
    try {

        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const data = await NewsletterModels.findByIdAndDelete(query);
        res.status(201).json({
            success: true,
            message: 'Subscriber Delete Successfull',
            data,
        });

    } catch (error) {
        console.log(error);
    }
};


const SubscriberManagerEmailSend = async (req, res) => {
    try {

        const data = req.body;
        
        const SubscriberData = await NewsletterModels.find();

        for (const SingleData of SubscriberData) {
            SubscriberManagerEmail(data, SingleData.email);
        }
        res.status(201).json({
            success: true,
            message: 'Subscriber Email Send Successfull',
        });

    } catch (error) {
        console.log(error);
    }
};





module.exports = { SubscriberManagerView, SubscriberManagerDelete, SubscriberManagerEmailSend };

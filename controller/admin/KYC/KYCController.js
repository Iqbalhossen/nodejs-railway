const userKYCVerirfyModels = require('../../../models/userKYCVerirfyModels');
const userModels = require('../../../models/userModels');

const { ObjectId } = require('mongodb');

const AdminKYCPendingView = async (req, res) => {
    try {

        const data = await userKYCVerirfyModels.find({ status: 0 });
        res.status(201).json({
            success: true,

            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminKYCDetailsView = async (req, res) => {
    try {

        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const data = await userKYCVerirfyModels.findOne(query);
        res.status(201).json({
            success: true,
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};
const AdminKYCDetailsByUserId = async (req, res) => {
    try {

        const id = req.params.id;
        const data = await userKYCVerirfyModels.findOne({ user_id: id }).sort('-created_at');
        console.log(id)
        res.status(201).json({
            success: true,
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminKYAccept = async (req, res) => {
    try {

        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const option = { upsert: true };

        const exsitsData = await userKYCVerirfyModels.findOne(query);
        const UserQuery = { _id: new ObjectId(exsitsData?.user_id) };
        
        await userModels.findByIdAndUpdate(UserQuery, { kv: true }, option);
        const data = await userKYCVerirfyModels.findByIdAndUpdate(query, { status: 1 }, option);
        res.status(201).json({
            success: true,
            message: "KYC Approve successfully",
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};
const AdminKYCReject = async (req, res) => {
    try {

        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const option = { upsert: true };

        const data = await userKYCVerirfyModels.findByIdAndUpdate(query, { status: 2 }, option);
        res.status(201).json({
            success: true,
            message: "KYC Reject successfully",
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};

// Home Bouns Store section End


module.exports = { AdminKYCPendingView, AdminKYCDetailsView, AdminKYAccept, AdminKYCReject, AdminKYCDetailsByUserId };

const ManualGatewaysModels = require('../../../models/PaymentGateways/ManualGateways');
const sharp = require('sharp');
const fs = require('fs');
const { ObjectId } = require('mongodb');
// Home Bouns Store section 
const AdminManualGatewaysView = async (req, res) => {
    try {

        const data = await ManualGatewaysModels.find();
        res.status(201).json({
            success: true,
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};
const AdminManualGatewaysAdd = async (req, res) => {
    try {
        const data = req.body;
        const storeData = { ...data, Status: 1 }

        const results = await ManualGatewaysModels.create(storeData);
        res.status(201).json({
            success: true,
            message: "Manual Gateways  add successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};

const AdminManualGatewaysInableDisable = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await ManualGatewaysModels.findOne(query);
        console.log(data)
        const option = { upsert: true };

        if (data?.Status === 0) {
            const status = { Status: 1 }
            const results = await ManualGatewaysModels.findByIdAndUpdate(query, status, option);
            res.status(201).json({
                success: true,
                message: "Enable successfully",
                data: results,
            });
        } else {
            const status = { Status: 0 }
            const results = await ManualGatewaysModels.findByIdAndUpdate(query, status, option);
            res.status(201).json({
                success: true,
                message: "Disabled successfully",
                data: results,
            });
        }


    } catch (error) {
        console.log(error);
    }
};
const AdminManualGatewaysEdit = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await ManualGatewaysModels.findOne(query);
        res.status(201).json({
            success: true,
            message: "Manual Gateways Edit successfully",
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};
const AdminManualGatewaysUpdate = async (req, res) => {
    try {
        const data = req.body;
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const results = await ManualGatewaysModels.findByIdAndUpdate(query, data, option);
        res.status(201).json({
            success: true,
            message: "Manual Gateways Update successfully",
            data: results,
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminManualGatewaysDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const results = await ManualGatewaysModels.findByIdAndDelete(query);

        res.status(201).json({
            success: true,
            message: "Manual Gateways Delete successfully",
            data: results
        });


    } catch (error) {
        console.log(error);
    }
};



// Home Bouns Store section End


module.exports = { AdminManualGatewaysView, AdminManualGatewaysAdd, AdminManualGatewaysInableDisable, AdminManualGatewaysDelete, AdminManualGatewaysEdit, AdminManualGatewaysUpdate };

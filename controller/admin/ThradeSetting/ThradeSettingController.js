const ThradeSettingModels = require('../../../models/ThradeSetting/ThradeSettingModel');
const sharp = require('sharp');
const fs = require('fs');
const { ObjectId } = require('mongodb');
// Home Bouns Store section 
const AdminThradeSettingView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await ThradeSettingModels.find().sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await ThradeSettingModels.find();
        const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data: data,
            length: dataLength.length,
            page: page,
            limit: limit,
            pageCount
        });


    } catch (error) {
        console.log(error);
    }
};


const AdminThradeSettingAdd = async (req, res) => {
    try {
        const data = req.body;

        const storeData = { ...data, }
        const results = await ThradeSettingModels.create(storeData);
        res.status(201).json({
            success: true,
            message: "Thrade Setting  add successfull",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};


const AdminThradeSettingEdit = async (req, res) => {
    try {
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await ThradeSettingModels.findOne(query);
        res.status(201).json({
            success: true,
            message: "Thrade Setting Edit successfully",
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};
const AdminThradeSettingUpdate = async (req, res) => {
    try {
        const data = req.body;
        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const option = { upsert: true };
        const results = await ThradeSettingModels.findByIdAndUpdate(query, data, option);
        res.status(201).json({
            success: true,
            message: "Thrade Setting  Update successfully",
            data: results,
        });





    } catch (error) {
        console.log(error);
    }
};

const AdminThradeSettingDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const results = await ThradeSettingModels.findByIdAndDelete(query);
        res.status(201).json({
            success: true,
            message: "Thrade Setting Delete successfully",
            data: results
        });


    } catch (error) {
        console.log(error);
    }
};



// Home Bouns Store section End


module.exports = { AdminThradeSettingView, AdminThradeSettingAdd, AdminThradeSettingDelete, AdminThradeSettingUpdate };

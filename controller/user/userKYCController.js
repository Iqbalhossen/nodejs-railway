const UserKYCModels = require('../../models/userKYCVerirfyModels');

// const sharp = require('sharp');
// const fs = require('fs');
const { ObjectId } = require('mongodb');
// Home Bouns Store section 
const UserKYCStore = async (req, res) => {
    try {
        const data = req.body;
        const front_img_path = req.files.front_page_img[0].destination + req.files.front_page_img[0].filename
        const back_img_path = req.files.back_page_img[0].destination + req.files.back_page_img[0].filename
        const storeData = { user_name: data.name, user_id: data.user_id, front_img: front_img_path, back_img: back_img_path, user_img: data?.user_img, type: data.type, status: 0 }
        await UserKYCModels.create(storeData);
        console.log(storeData)
        res.status(201).json({
            success: true,
            message: "KYC verify pending",
            data: storeData,
        });

    } catch (error) {
        console.log(error);
    }
};
const UserKYCView = async (req, res) => {
    try {
        const id = req.params.id;
        const results = await UserKYCModels.findOne({user_id:id}).sort('-created_at');
// console.log(results)
        res.status(201).json({
            success: true,
            message: "notice update successfully",
            data: results,
        });
    } catch (error) {
        console.log(error);
    }
};





module.exports = { UserKYCStore, UserKYCView};

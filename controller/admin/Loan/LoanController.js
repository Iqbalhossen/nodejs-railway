const LoanModels = require('../../../models/Loan/LoanModels');
const userModels = require('../../../models/userModels');
const { ObjectId } = require('mongodb');
const { TransactionsLoan } = require('../../../commonfile/Transactions/Transactions');
let moment = require('moment');

const AdminLoanPendingView = async (req, res) => {
    try {
        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await LoanModels.find({ status: 0 }).sort('-createdAt').skip(skip).limit(limit);;
        const dataLength = await LoanModels.find({ status: 0 });
        const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount,
        });
 


    } catch (error) {
        console.log(error);
    }
};

const AdminLoanSingleView = async (req, res) => {
    try {

        const old_id = req.params.id;
        const query = { _id: new ObjectId(old_id) };
        const data = await LoanModels.findOne(query);

        res.status(201).json({
            success: true,
            data: data,
        });


    } catch (error) {
        console.log(error);
    }
};

const AdminLoanAccept = async (req, res) => {
    try {
        
        const data = req.body;
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };

        const ExsitData = await LoanModels.findOne(filter);

        const interest_amount =(parseFloat(ExsitData?.amount) + (parseFloat(parseFloat(ExsitData?.amount) * parseFloat(data?.percentage)) / 100 ));

        const findDate = moment(Date.now(data?.expired_time)).format('DD-MM-YYYY');
        
        TransactionsLoan(ExsitData);

        const results = await LoanModels.findByIdAndUpdate(filter, {percentage:data?.percentage, interest_amount:interest_amount, expired_time:findDate, status:1 }, option);
        res.status(201).json({
            success: true,
            message: "Loan Aproved successfull",
            data: results,
        });

    } catch (error) {
        console.log(error);
    }
};



const AdminLoanReject = async (req, res) => {
    try {
        
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const results = await LoanModels.findByIdAndUpdate(filter, {status:2 }, option);
        res.status(201).json({
            success: true,
            message: "Loan reject successfull",
            data: results,
        });

    } catch (error) {
        console.log(error);
    }
};

 

const AdminLoanApprovedView = async (req, res) => {
    try {

        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await LoanModels.find({ status: 1 }).sort('-createdAt').skip(skip).limit(limit);;
        const dataLength = await LoanModels.find({ status: 1 });
        const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount,
        });
 


    } catch (error) {
        console.log(error);
    }
};



const AdminLoanRejectView = async (req, res) => {
    try {

        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await LoanModels.find({ status: 2 }).sort('-createdAt').skip(skip).limit(limit);;
        const dataLength = await LoanModels.find({ status: 2 });
        const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount,
        });
 


    } catch (error) {
        console.log(error);
    }
};

const AdminLoanCompletedView = async (req, res) => {
    try {

        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const data = await LoanModels.find({ status: 3 }).sort('-createdAt').skip(skip).limit(limit);;
        const dataLength = await LoanModels.find({ status: 3 });
        const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));
        res.status(201).json({
            success: true,
            data,
            length: dataLength.length,
            page,
            limit,
            pageCount,
        });
 
    } catch (error) {
        console.log(error);
    }
};

module.exports = {AdminLoanPendingView, AdminLoanAccept, AdminLoanSingleView, AdminLoanReject, AdminLoanRejectView, AdminLoanApprovedView, AdminLoanCompletedView  };

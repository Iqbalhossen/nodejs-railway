const TransactionsModels = require('../../../models/Transactions/TransactionsModels');

const { ObjectId } = require('mongodb');

const AdminTransactionsViewByUserId = async (req, res) => {
    try {

        let { page, limit } = req.query;

        const skip = ((page - 1) * 10);
        if (!page) page = 1;
        if (!limit) limit = 10;

        const id = req.params.id;
        const data = await TransactionsModels.find({ user_id: id }).sort('-createdAt').skip(skip).limit(limit);
        const dataLength = await TransactionsModels.find({ user_id: id });
        const pageCount = Math.ceil( parseFloat(dataLength.length) / parseFloat(limit));

        res.status(201).json({
            success: true,
            data: data,
            page: page,
            limit: limit,
            pageCount
        });


    } catch (error) {
        console.log(error);
    }
};




module.exports = { AdminTransactionsViewByUserId, };

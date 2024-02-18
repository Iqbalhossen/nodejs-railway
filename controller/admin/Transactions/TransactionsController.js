const TransactionsModels = require('../../../models/Transactions/TransactionsModels');

const { ObjectId } = require('mongodb');

const AdminTransactionsViewByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await TransactionsModels.find({user_id:id}).sort('-created_at');
        res.status(201).json({
            success: true,         
            data: data,
            length: data.length
        });


    } catch (error) {
        console.log(error);
    }
};




module.exports = { AdminTransactionsViewByUserId,  };

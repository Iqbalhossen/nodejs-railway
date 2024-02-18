const TransactionsModels = require('../../../models/Transactions/TransactionsModels');
const { ObjectId } = require('mongodb');

const AdminReportView = async (req, res) => {
	try {

		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
		let trx_type = req.query.trx_type || "";
		let remark = req.query.remark || "";
		let start_date = req.query.start_date || "";
		let end_date = req.query.end_date;
		
		if (trx_type === "plus") {
			
			if (start_date && end_date ) {
				// console.log(start_date == undefined)
				const data = await TransactionsModels.find({
					trx: { $regex: search, $options: "i" },
					trx_type: "+",
					remark: { $regex: remark, $options: "i" }
				});
				res.status(201).json({
					success: true,
					data: data,
					message: 'Filter successfull',
					length: data.length
				});


			} else {

				const data = await TransactionsModels.find(
					{
						trx: { $regex: search, $options: "i" },
						trx_type: "+",
						remark: { $regex: remark, $options: "i" },
						"created_at": {
							"$gte": new Date(req.query.start_date),
							"$lt": new Date(req.query.end_date)
						}
					});
				res.status(201).json({
					success: true,
					data: data,
					message: 'Filter successfull',
					length: data.length
				});

			}
		} else {

			if (start_date && end_date) {
				const data = await TransactionsModels.find({ trx: { $regex: search, $options: "i" }, trx_type: { $regex: trx_type, $options: "i" }, remark: { $regex: remark, $options: "i" }, });
				res.status(201).json({
					success: true,
					message: 'Filter successfull',
					data: data,
					length: data.length
				});

			} else {

				const data = await TransactionsModels.find({ trx: { $regex: search, $options: "i" }, trx_type: { $regex: trx_type, $options: "i" }, remark: { $regex: remark, $options: "i" }, });
				res.status(201).json({
					success: true,
					message: 'Filter successfull',
					data: data,
					length: data.length
				});

			}

		}




	} catch (error) {
		console.log(error);
	}
};





module.exports = { AdminReportView, };

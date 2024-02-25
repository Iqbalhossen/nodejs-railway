const TransactionsModels = require('../../../models/Transactions/TransactionsModels');
const { ObjectId } = require('mongodb');

const AdminReportView = async (req, res) => {
	try {
		const aaaaa = await TransactionsModels.find();

		console.log(aaaaa.length)

		let { page, limit } = req.query;

		const skip = ((page - 1) * 10);
		if (!page) page = 1;
		if (!limit) limit = 10;

		const search = req.query.search || "";
		let trx_type = req.query.trx_type || "";
		let remark = req.query.remark || "";
		let start_date = req.query.start_date || "";
		let end_date = req.query.end_date;

		if (trx_type === "plus") {

			if (start_date && end_date) {
				// console.log(start_date == undefined)
				const data = await TransactionsModels.find({
					trx: { $regex: search, $options: "i" },
					trx_type: "+",
					remark: { $regex: remark, $options: "i" }
				}).sort('-createdAt').skip(skip).limit(limit);;

				const dataLength = await TransactionsModels.find({
					trx: { $regex: search, $options: "i" },
					trx_type: "+",
					remark: { $regex: remark, $options: "i" }
				});
				const pageCount = Math.ceil(parseFloat(dataLength.length) / parseFloat(limit));
				res.status(201).json({
					success: true,
					message: 'Filter successfull',
					data,
					length: dataLength.length,
					page,
					limit,
					pageCount,
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
					}).sort('-createdAt').skip(skip).limit(limit);;

				const dataLength = await TransactionsModels.find({
					trx: { $regex: search, $options: "i" },
					trx_type: "+",
					remark: { $regex: remark, $options: "i" },
					"created_at": {
						"$gte": new Date(req.query.start_date),
						"$lt": new Date(req.query.end_date)
					}
				});
				const pageCount = Math.ceil(parseFloat(dataLength.length) / parseFloat(limit));
				res.status(201).json({
					success: true,
					message: 'Filter successfull',
					data,
					length: dataLength.length,
					page,
					limit,
					pageCount,
				});


			}
		} else {

			if (start_date && end_date) {
				const data = await TransactionsModels.find({ trx: { $regex: search, $options: "i" }, trx_type: { $regex: trx_type, $options: "i" }, remark: { $regex: remark, $options: "i" }, }).sort('-createdAt').skip(skip).limit(limit);;

				const dataLength = await TransactionsModels.find({ trx: { $regex: search, $options: "i" }, trx_type: { $regex: trx_type, $options: "i" }, remark: { $regex: remark, $options: "i" }, });
				const pageCount = Math.ceil(parseFloat(dataLength.length) / parseFloat(limit));
				res.status(201).json({
					success: true,
					message: 'Filter successfull',
					data,
					length: dataLength.length,
					page,
					limit,
					pageCount,
				});

			} else {

				const data = await TransactionsModels.find({ trx: { $regex: search, $options: "i" }, trx_type: { $regex: trx_type, $options: "i" }, remark: { $regex: remark, $options: "i" }, }).sort('-createdAt').skip(skip).limit(limit);;

				const dataLength = await TransactionsModels.find({ trx: { $regex: search, $options: "i" }, trx_type: { $regex: trx_type, $options: "i" }, remark: { $regex: remark, $options: "i" }, });
				const pageCount = Math.ceil(parseFloat(dataLength.length) / parseFloat(limit));
				res.status(201).json({
					success: true,
					message: 'Filter successfull',
					data,
					length: dataLength.length,
					page,
					limit,
					pageCount,
				});


			}

		}




	} catch (error) {
		console.log(error);
	}
};





module.exports = { AdminReportView, };

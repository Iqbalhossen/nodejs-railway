const NewsletterModels = require('../../../models/Newsletter/NewsletterModels');
const NewsletterStore = async (req, res) => {
    try {
        const data = req.body;
        const exsitEmail = await NewsletterModels.findOne({ email: data.email });
        if (exsitEmail) {
            res.status(401).json({
                success: false,
                message: "already subscribe",
            });
        } else {
            await NewsletterModels.create(data);
            res.status(201).json({
                success: true,
                message: "Subscribe successfull",
            });
        }


    } catch (error) {
        console.log(error);
    }
};





module.exports = { NewsletterStore, };

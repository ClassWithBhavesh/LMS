const paymentServices = require("../services/payment.service.js");

const createOrder = async(req, res) => {
    try {
        const {courseId} = req.body;

        const response = await paymentServices.createOrder(req.user._id, courseId);

        return res.status(200).json(response);
    } catch (error) {

        console.error(`Create Order Controller Error - ${error}`);

        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


const verifyPayment = async(req, res) => {
    try {
        const {courseId, razorpay_order_id, razorpay_payment_Id, razorpay_signature} = req.body;

        const response = await paymentServices.verifyPayment({
            userId: req.user._id,
            courseId,
            razorpay_order_id,
            razorpay_payment_Id,
            razorpay_signature
        });

        return res.status(200).json(response);

    } catch (error) {

        console.error(`Verify Payment Controller Error - ${error}`);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    } 
}



module.exports = {
    createOrder, 
    verifyPayment
}
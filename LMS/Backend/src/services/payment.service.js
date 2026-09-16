const crypto = require("crypto");
const razorpay = require("../utils/razorpay.js");

const Course = require("../models/Course.model.js");
const EnrolledUsers = require("../models/EnrolledUser.model.js");
const Payment = require("../models/Payment.model.js");

const createOrder = async(userId, courseId) =>{
    const course = await Course.findById(courseId);

    if(!course){
        throw new Error("Course Not Found");
    }

    const alreadyEnrolled = await EnrolledUsers.findOne({
        userId, 
        courseId,
        status: "active"
    })

    if(alreadyEnrolled){
        throw new Error("You are already enrolled in this course!");
    }
    
    // coverting ₹ - paise
    const amount = course.price;

    if(!amount || amount <= 0){
        throw new Error("Invalid Course Amount!");
    }

    const amountInPaise = Math.round(amount * 100);
    
    const order = await razorpay.orders.create({
        amount: amountInPaise, 
        currency: "INR",
        receipt: `course_${course._id}_${Date.now()}`,
        notes: {
            courseId: course._id.toString(),
            userId: userId.toString(),
            courseName: course.title
        }
    });
    console.log(order);

    const payment = await Payment.create({
        userId,
        courseId,
        razorpayOrderId: order.id,
        amount: amountInPaise,
        currency: "INR",
        status: "created"
    });

    return {
        success: true,
        order: {
            id: order.id,
            amount: order.amount,
            currency: order.currency
        },
        paymentId: payment._id,
        course: {
            _id: course._id,
            title: course.title,
            price: course.price
        },
        razorpayKey: process.env.RAZORPAY_KEY_ID
    };
};

const verifyPayment = async(userId, courseId, razorpay_order_id, razorpay_payment_id, razorpay_signature) =>{
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
        throw new Error("Incomplete Razorpay Payment Details");
    }

    const payment = await Payment.findOne({
        razorpayOrderId: razorpay_order_id,
        userId,
        courseId
    });

    if(!payment){
        throw new Error("Payment Order Not Found");
    }
    
    const generateSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");

    const signatureMatch = crypto.timingSafeEqual(
        Buffer.from(generateSignature),
        Buffer.from(razorpay_signature)
    );

    if(!signatureMatch){
        throw new Error("Payment Verification Failed");
    }

    if(payment.status === "paid"){
        const exisitngEnrollment = await EnrolledUsers.findOne({
            userId, 
            courseId, 
            status: "active"
        })

        return {
            success: true,
            message: "Payment Already Verified",
            enrollment: exisitngEnrollment
        }
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razropaySignature = razorpay_signature;

    payment.status = "paid"

    await payment.save();

    const alreadyEnrolled = await EnrolledUsers.findOne({
        userId, 
        courseId
    });

    if(alreadyEnrolled){
        if(alreadyEnrolled.status !== "active"){
            alreadyEnrolled.status = "active";
            await alreadyEnrolled.save();
        }

        return {
            success: true,
            message: "Payment Verified! Course Access Restored!",
            enrollment: alreadyEnrolled
        };
    }

    const enrollment = await EnrolledUsers.create({
        userId,
        courseId,
        status: "active"
    });

    return {
        success: true,
        message: "Payment Verified Successfully! \nEnrollment Completed!",
        enrollment
    }

};


module.exports = {createOrder, verifyPayment};

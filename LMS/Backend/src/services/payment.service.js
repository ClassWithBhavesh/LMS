const crypto = require("crypto");
const razorpay = require("../utils/razorpay.js");

const Course = require("../models/Course.model.js");
const EnrolledUsers = require("../models/EnrolledUser.model.js");

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
    const amount = course.price * 100;

    const order = await razorpay.orders.create({
        amount, 
        currency: "INR",
        receipt: `course_${course._id}_${Date.now()}`,
        notes: {
            courseId: course._id.toString(),
            userId: userId.toString(),
            courseName: course.title
        }
    })

    return {
        success: true,
        order,
        course: {
            _id: course._id,
            title: course.title,
            price: course.price
        },
        razorpayKey: process.env.RAZORPAY_KEY_ID
    };
};

const verifyPayment = async(userId, courseId, razorpay_order_id, razorpay_payment_id, razorpay_signature) =>{
    const course = await Course.findById(courseId);

    if(!course){
        throw new Error("Course Not Found!");
    }

    const generateSignature = crypto.createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
    ).update(`${razorpay_order_id} | ${razorpay_payment_id}`).digest("hex");

    if(generateSignature !== razorpay_signature){
        throw new Error("Payment Verification Failed!");
    }

    const alreadyEnrolled = await EnrolledUsers.findOne({
        userId, 
        courseId,
        status: "active"
    })

    if(alreadyEnrolled){
        return {
            success: true,
            message: "Already Enrolled",
            enrolled: alreadyEnrolled
        }
    }

    const enrollment = await EnrolledUsers.create({
        userId,
        courseId,
        status: "active"
    })

    return {
        success: true,
        message: "Payment Verified Successfully! Enrollment Completed....",
        enrollment
    };
};



module.exports = {createOrder, verifyPayment};



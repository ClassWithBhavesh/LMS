const mongoose = require("mongoose");


const enrolledUserSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visitor",
            required: true
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        status: {
            type: String,
            enum: [
                "pending",
                "active",
                "cancelled",
                "completed"
            ],
            default: "active"
        }
    },{
        timestamps: true
    }
)


module.exports = mongoose.model(
    "EnrolledUser",
    enrolledUserSchema
);
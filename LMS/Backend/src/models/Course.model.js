const mongoose = require("mongoose");



const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        instructor: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 2999
        },
        duration: {
            type: String
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Course", 
    courseSchema
)


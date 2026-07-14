const Course = require("../models/Course.model.js");
const Lecture = require("../models/Lecture.model.js");
const Enrollment = require("../models/EnrolledUser.model.js");


exports.getCourseAccess = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            userId: req.user.id,
            courseId: req.params.courseId,
            status: "active"
        })

        if(!enrollment){
            res.status(404).json({
                success: false,
                message: "User Not Found!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User Existed",
            hasAccess: !enrollment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



exports.getCourseLectures = async (req, res) => {
    try {
            const enrollment = await Enrollment.findOne({
            userId: req.user.id,
            courseId: req.params.courseId
        })
    
    if(!enrollment){
        return res.status(403).json({
            success: false,
            message: "Course Not Purchased"
        })
    }

    const lectures = await Lecture.find({
        courseId: req.params.courseId
    })

    return res.status(200).json({
        success: true,
        lectures
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}
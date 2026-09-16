const Course = require("../models/Course.model.js");
const Lecture = require("../models/Lecture.model.js");
const Enrollment = require("../models/EnrolledUser.model.js");


exports.getAllCourses = async(req, res) => {
    try {
        const courses = await Course.find({isPublished: true}).sort({
            createdAt: -1,
        })
        
        return res.status(200).json({
            success: true,
            count: courses.length,
            courses,
        })
    } catch (error) {
        console.error("Couldn't Fetch All Courses! - ", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch courses from DB!"
        })
    }
}

exports.getCourseAccess = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            userId: req.user.id,
            courseId: req.params.courseId,
            status: "active"
        })

        if(!enrollment){
            return res.status(404).json({
                success: false,
                message: "User Not Found!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User Existed",
            hasAccess: !enrollment
        });

    } catch (error) {

        console.error(`Course Access Controller Error - \n ${error}`);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


exports.getCourseBySlug  = async (req, res) => {
    try {
        console.log("course slug -", req.params.slug);
        const course = await Course.findOne({
            slug: req.params.slug,
            isPublished: true
        });

        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        console.error("Get Course Error :", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



exports.getCourseLectures = async (req, res) => {
    try {
            const enrollment = await Enrollment.findOne({
            userId: req.user.id,
            courseId: req.params.courseId,
            status: "active"
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

        console.error(`Lecture Controller Error - ${error}`);

        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}


exports.getCourseDetails = async(req, res) => {
    try {
        console.log("reqeust parameter - \n", req.params.courseId);
        const course = await Course.findOne({
            _id: req.params.courseId
        });

        if(!course){
            return res.status(404).json({
                message: `${req.params.courseId} not found!`
            })
        }

        // console.log(`Course Details - \n ${course}`);

        return res.status(200).json({
            message: `${req.params.courseId} found successfully`,
            course: course
        })
    } catch (error) {
        console.log(`Error from Server - \n ${error}`);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
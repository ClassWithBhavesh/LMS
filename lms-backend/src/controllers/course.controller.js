const Course = require("../models/Course.model");
const Section = require("../models/Section.model");
const Lecture = require("../models/Lecture.model");


// ================= CREATE COURSE =================
exports.createCourse = async (req, res, next) => {
  try {

    if (req.user.role !== "instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can create courses"
      });
    }

    if (req.user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Instructor not approved yet"
      });
    }

    const course = await Course.create({
      ...req.body,
      instructor: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course
    });

  } catch (error) {
    next(error);
  }
};



// ================= ADD SECTION =================
exports.addSection = async (req, res, next) => {
  try {

    const { courseId, title } = req.body;

    const section = await Section.create({
      title,
      course: courseId
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { sections: section._id }
    });

    res.status(201).json({
      success: true,
      message: "Section added",
      section
    });

  } catch (error) {
    next(error);
  }
};



// ================= ADD LECTURE =================
exports.addLecture = async (req, res, next) => {
  try {

    const { sectionId, title, videoUrl, notesUrl, duration, isPreview } = req.body;

    const lecture = await Lecture.create({
      title,
      videoUrl,
      notesUrl,
      duration,
      isPreview,
      section: sectionId
    });

    await Section.findByIdAndUpdate(sectionId, {
      $push: { lectures: lecture._id }
    });

    res.status(201).json({
      success: true,
      message: "Lecture added",
      lecture
    });

  } catch (error) {
    next(error);
  }
};



// ================= GET ALL COURSES =================
exports.getAllCourses = async (req, res, next) => {
  try {

    const courses = await Course.find({ isPublished: true })
      .populate("instructor", "name")
      .select("-sections");

    res.status(200).json({
      success: true,
      courses
    });

  } catch (error) {
    next(error);
  }
};



// ================= GET COURSE DETAILS =================
exports.getCourseDetails = async (req, res, next) => {
  try {

    const course = await Course.findById(req.params.id)
      .populate({
        path: "sections",
        populate: {
          path: "lectures"
        }
      });

    res.status(200).json({
      success: true,
      course
    });

  } catch (error) {
    next(error);
  }
};



// ================= PUBLISH COURSE =================
exports.publishCourse = async (req, res, next) => {
  try {

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    course.isPublished = true;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Course published successfully"
    });

  } catch (error) {
    next(error);
  }
};
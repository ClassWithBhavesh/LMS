const express = require("express");

const router = express.Router();

const {getCourseAccess, getCourseLectures, getCourseBySlug, getAllCourses, getCourseDetails} = require("../controllers/course.controller.js");

const {protect} = require("../middlewares/auth.middleware.js");

router.get("/", getAllCourses);

router.get("/:courseId/access", protect, getCourseAccess);

router.get("/:courseId/lectures", protect, getCourseLectures);

router.get("/slug/:slug", getCourseBySlug);

router.get("/:courseId", getCourseDetails);

// router.get("/checkout/:courseId", getPaymentData);

module.exports = router;
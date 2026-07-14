const express = require("express");

const router = express.Router();

const {getCourseAccess, getCourseLectures} = require("../controllers/course.controller.js");

const {protect} = require("../middlewares/auth.middleware.js");

router.get("/:courseId/access", protect, getCourseAccess);

router.get("/:courseId/lectures", protect, getCourseLectures);

module.exports = router;
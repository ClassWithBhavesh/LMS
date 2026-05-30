const express = require("express");

const router = express.Router();

const {getCourseAccess, getCourseLectures} = require("../controllers/course.controller.js");

const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/:courseId/access", authMiddleware, getCourseAccess);

router.get("/:courseId/lectures", authMiddleware, getCourseLectures);

module.exports = router;
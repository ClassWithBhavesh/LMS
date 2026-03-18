const express = require("express");
const router = express.Router();

const {
  createCourse,
  addSection,
  addLecture,
  getAllCourses,
  getCourseDetails,
  publishCourse
} = require("../controllers/course.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");


// Instructor Routes
router.post("/create", protect, authorizeRoles("instructor"), createCourse);
router.post("/section", protect, authorizeRoles("instructor"), addSection);
router.post("/lecture", protect, authorizeRoles("instructor"), addLecture);
router.put("/publish/:id", protect, authorizeRoles("instructor"), publishCourse);

// Public Routes
router.get("/", getAllCourses);
router.get("/:id", getCourseDetails);

module.exports = router;
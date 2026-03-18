const express = require("express");
const router = express.Router();

const {getAllUsers, getAllInstructors, getPendingInstructor, approveInstructor, blockUser, unBlockUser} = require("../controllers/admin.controller");
const {protect} = require("../middlewares/auth.middleware");
const {authorizeRoles} = require("../middlewares/role.middleware");


router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.get("/instructors", protect, authorizeRoles("admin"), getAllInstructors);
router.get("/instructor/pending", protect, authorizeRoles("admin"), getPendingInstructor);
router.put("/instructor/approve/:id", protect, authorizeRoles("admin"), approveInstructor);
router.put("/user/block/:id", protect, authorizeRoles("admin"), blockUser);
router.put("/user/unblock/:id", protect, authorizeRoles("admin"), unBlockUser);

module.exports = router;



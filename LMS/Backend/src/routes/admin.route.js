const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAllInstructors,
  getPendingInstructors,
  approveInstructor,
  blockUser,
  unblockUser
} = require("../controllers/admin.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");


// ================= ADMIN ROUTES =================

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);

router.get("/instructors", protect, authorizeRoles("admin"), getAllInstructors);

router.get(
  "/instructors/pending",
  protect,
  authorizeRoles("admin"),
  getPendingInstructors
);

router.put(
  "/instructor/approve/:id",
  protect,
  authorizeRoles("admin"),
  approveInstructor
);

router.put(
  "/user/block/:id",
  protect,
  authorizeRoles("admin"),
  blockUser
);

router.put(
  "/user/unblock/:id",
  protect,
  authorizeRoles("admin"),
  unblockUser
);

module.exports = router;
const User = require("../models/User.model");


// ================= GET ALL USERS =================
exports.getAllUsers = async (req, res, next) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {
    console.log(error)
  }
};



// ================= GET ALL INSTRUCTORS =================
exports.getAllInstructors = async (req, res, next) => {
  try {

    const instructors = await User.find({ role: "instructor" });

    res.status(200).json({
      success: true,
      count: instructors.length,
      instructors
    });

  } catch (error) {
    console.log(error)
  }
};



// ================= GET PENDING INSTRUCTORS =================
exports.getPendingInstructors = async (req, res, next) => {
  try {

    const instructors = await User.find({
      role: "instructor",
      status: "pending"
    });

    res.status(200).json({
      success: true,
      count: instructors.length,
      instructors
    });

  } catch (error) {
    console.log(error)
  }
};



// ================= APPROVE INSTRUCTOR =================
exports.approveInstructor = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.role !== "instructor") {
      return res.status(400).json({
        success: false,
        message: "User is not an instructor"
      });
    }

    user.status = "active";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Instructor approved successfully"
    });

  } catch (error) {
    console.log(error)
  }
};



// ================= BLOCK USER =================
exports.blockUser = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.status = "blocked";

    await user.save();

    res.status(200).json({
      success: true,
      message: "User blocked successfully"
    });

  } catch (error) {
    console.log(error)
  }
};



// ================= UNBLOCK USER =================
exports.unblockUser = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.status = "active";

    await user.save();

    res.status(200).json({
      success: true,
      message: "User unblocked successfully"
    });

  } catch (error) {
    console.log(error)
  }
};
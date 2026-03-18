const User = require("../models/User.model");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllInstructors = async (req, res, next) => {
  try {
    const instructors = await User.find({ role: "instructor" });

    res.status(200).json({
      success: true,
      count: instructors.length,
      instructors,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPendingInstructor = async (req, res, next) => {
  try {
    const instructors = await User.find({
      role: "instructor",
      status: "pending",
    });

    res.status(200).json({
      success: true,
      count: instructors.length,
      instructors,
    });
  } catch (error) {
    next(error);
  }
};

exports.approveInstructor = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return req.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (user.role !== "instructor") {
      return res.status(400).json({
        success: false,
        message: "Selected User is not a Instructor",
      });
    }

    user.status = "active";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Instructor Has Been Approved",
    });
  } catch (error) {
    next(error);
  }
};

exports.blockUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    user.status = "blocked";
    await User.save();
    res.status(200).json({
        success: true,
        message: "User Blocked Successfully"
    });
  } catch (error) {
    next(error);
  }
};


exports.unBlockUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
        user.status = "active";

        await User.save();
        return res.status(200).json({
            success: true,
            message: "User un-Blocked Successfully!"
        })
    } catch (error) {
        next(error);        
    }
}
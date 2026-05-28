const {
  registerVisiter,
  loginVisiter,
} = require("../services/auth.service.js");
const asyncHandler = require("../middlewares/asyncHandler");

// ================= REGISTER =================
exports.register = async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(typeof(registerVisiter));
    const result = await registerVisiter(req.body);
    console.log("data to the server :", result);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      accessToken: result.accessToken,
      visiter: result.visiter,
    });
  } catch (error) {
    console.log(error);
  }
};

// ================= LOGIN =================
exports.login = async (req, res, next) => {
  try {
    // console.log("login user credentials : ", req.body);
    const result = await loginVisiter(req.body);
    console.log("backend se response of result - ", result);
    if (result === "User Not Found") {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: result.accessToken,
      visiter: result.visiter,
    });
  } catch (error) {
    // next(error);
    console.log(error);
  }
};

// const User = require("../models/User.model");
// const generateToken = require("../utils/generateToken");

// // ================= REGISTER =================
// exports.register = async (req, res, next) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       role,
//       phone,
//       dob,
//       collegeName,
//       educationLevel,
//       graduationCourse,
//       city
//     } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already registered"
//       });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role,
//       phone,
//       dob,
//       collegeName,
//       educationLevel,
//       graduationCourse,
//       city,
//       status: role === "instructor" ? "pending" : "active"
//     });

//     const token = generateToken(user._id, user.role);

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       token
//     });

//   } catch (error) {
//     next(error);
//   }
// };

// // ================= LOGIN =================
// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials"
//       });
//     }

//     if (user.status === "blocked") {
//       return res.status(403).json({
//         success: false,
//         message: "Account blocked by admin"
//       });
//     }

//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials"
//       });
//     }

//     if (user.role === "instructor" && user.status === "pending") {
//       return res.status(403).json({
//         success: false,
//         message: "Instructor account pending admin approval"
//       });
//     }

//     const token = generateToken(user._id, user.role);

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token
//     });

//   } catch (error) {
//     next(error);
//   }
// };

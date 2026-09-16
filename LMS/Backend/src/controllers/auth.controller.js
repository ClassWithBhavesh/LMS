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
    console.log(req.body);
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
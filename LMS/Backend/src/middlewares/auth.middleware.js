const jwt = require("jsonwebtoken");
const Visiter = require("../models/Visiter.model");

exports.protect = async (req, res, next) => {
  try {
    let token;

    // -----------------------------
    // 1. Extract token
    // -----------------------------
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    console.log("\n========== AUTH DEBUG ==========");
    console.log("Token received:", token);

    // -----------------------------
    // 2. Verify access token
    // -----------------------------
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    console.log("Decoded JWT:", decoded);
    console.log("Decoded ID:", decoded.id);

    // -----------------------------
    // 3. Find user
    // -----------------------------
    const user = await Visiter.findById(decoded.id).select("-password");

    console.log("User found in MongoDB:", user);

    if (!user) {
      console.log("❌ NO VISITER FOUND FOR ID:", decoded.id);

      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // -----------------------------
    // 4. Attach user
    // -----------------------------
    req.user = user;

    console.log("✅ AUTHENTICATED USER:", req.user._id);
    console.log("================================\n");

    next();
  } catch (error) {
    console.error("❌ PROTECT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Token invalid",
    });
  }
};

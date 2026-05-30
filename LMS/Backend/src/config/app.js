const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("../routes/auth.route.js");
const adminRoutes = require("../routes/admin.route.js");
const courseRoutes = require("../routes/course.route.js");
const { errorHandler } = require("../middlewares/error.middleware.js");

const server = express();

server.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
server.use(express.json());
server.use(morgan("dev"));

server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/admin", adminRoutes);
server.use("/api/v1/course", courseRoutes);

server.get("/", (req, res) => {
  res.send("LMS API Running...");
});



server.use(errorHandler);

module.exports = server;
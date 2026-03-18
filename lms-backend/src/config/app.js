const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("../routes/auth.routes");
const adminRoutes = require("../routes/admin.routes");
const courseRoutes = require("./routes/course.routes");

const { errorHandler } = require("../middlewares/error.middleware");

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

server.use("/api/v1/auth", authRoutes);
server.use("/api/vi/admin", adminRoutes);
server.use("/api/v1/courses", courseRoutes);


server.get("/", (req, res) => {
  res.send("LMS API Running...");
});

server.use(errorHandler);

module.exports = server;
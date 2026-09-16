const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lessons: [
      {
        type: String,
      },
    ],
  },
  { _id: false },
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 2999,
    },
    duration: {
      type: String,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    students: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4,
    },
    modules: [moduleSchema],
    benefits: [
      {
        type: String,
      },
    ],
    tools: [{ type: String }],
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Course", courseSchema);

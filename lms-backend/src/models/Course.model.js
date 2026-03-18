const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    thumbnail: {
      type: String
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
      }
    ],

    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    ratingsAverage: {
      type: Number,
      default: 0
    },

    ratingsCount: {
      type: Number,
      default: 0
    },

    isPublished: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
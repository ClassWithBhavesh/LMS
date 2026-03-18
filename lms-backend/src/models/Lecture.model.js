const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    videoUrl: {
      type: String,
      required: true
    },

    notesUrl: {
      type: String
    },

    duration: {
      type: Number
    },

    isPreview: {
      type: Boolean,
      default: false
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lecture", lectureSchema);
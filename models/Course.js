const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // e.g., "CS101"
  instructor: { type: String, required: true },
  description: { type: String },
  credits: { type: Number, required: true },
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  schedule: [{
    day: { type: String, required: true },
    time: { type: String, required: true },
  }],
});

module.exports = mongoose.model("Course", CourseSchema);

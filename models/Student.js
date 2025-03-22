const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  // Roll no
  id: {type: String, required: true, unique: true},
  // Courses enrolled in
  courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
});

module.exports = mongoose.model("Student", StudentSchema);

const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  // Roll no
  username: {type: String, required: true, unique: true},
  // Courses enrolled in
  password: [{type: String, required: true}],
});

module.exports = mongoose.model("Admin", AdminSchema);

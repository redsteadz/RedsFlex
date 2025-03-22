const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Course = require('../models/Course');

router.post('/add-admin', async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username, password);
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(201).send('Admin added successfully');
  } catch (error) {
    res.status(500).send('Error adding admin: ' + error.message);
  }
});

// code: { type: String, required: true, unique: true }, // e.g., "CS101"
//   instructor: { type: String, required: true },
//   description: { type: String },
//   credits: { type: Number, required: true },
//   prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
//   studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
//   schedule: [{
//     day: { type: String, required: true },
//     time: { type: String, required: true },
router.post('/add-course', async (req, res) => {
  try {
    const { code, instructor, description, credits, prerequisites, studentsEnrolled, schedule } = req.body;
    const newCourse = new Course({ code, instructor, description, credits, prerequisites, studentsEnrolled, schedule });
    console.log(newCourse);
    await newCourse.save();
    res.status(201).send('Course added successfully');
  } catch (error) {
    res.status(500).send('Error adding course: ' + error.message);
  }
})

router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({username, password});
    if (!admin) {
      return res.status(404).send('admin not found');
    } else {
      req.session.sessionId = admin.username;
      req.session.usertype = 'admin';
      return res.status(200).send('admin logged in successfully');
    }
  } catch (error) {
    res.status(500).send('Error logging in: ' + error.message);
  }
})

module.exports = router;

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');

router.post('/add-student', async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    //console.log(id, courses);
    const newStudent = new Student({ id });
    await newStudent.save();
    res.status(201).send('Student added successfully');
  } catch (error) {
    res.status(500).send('Error adding student: ' + error.message);
  }
});

router.post('/add-course', async (req, res) => {
  try {
    // Must have passed student id and course_code 
    const { id, code } = req.body;
    const student = await Student.findOne({ id });
    const course = await Course.findOne({ code });
    //console.log(student, course);
    if (!student || !course) {
      return res.status(404).send('Student or course not found');
    }
    if (student.courses.some(c => c._id.equals(course._id))) {
      return res.status(400).send('Student already enrolled in course');
    }
    student.courses.push(course);
    course.studentsEnrolled.push(student);
    await student.save();
    await course.save();
    res.status(200).send('Course ${code} added successfully');
  } catch (error) {
    
  }
})

router.post('/auth/login', async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).send('Student not found');
    } else {
      req.session.sessionId = student.id;
      req.session.usertype = 'student';
      return res.status(200).send('Student logged in successfully');
    }
  } catch (error) {
    res.status(500).send('Error logging in: ' + error.message);
  }
})

module.exports = router;

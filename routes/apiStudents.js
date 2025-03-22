const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/add-student', async (req, res) => {
  try {
    console.log(req.body);
    const { id, courses } = req.body;
    console.log(id, courses);
    const newStudent = new Student({ id, courses });
    await newStudent.save();
    res.status(201).send('Student added successfully');
  } catch (error) {
    res.status(500).send('Error adding student: ' + error.message);
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findOne({id});
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

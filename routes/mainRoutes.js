const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const mainController = require('../controllers/mainController');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

router.get('/', mainController.homePage);

// Protected route - Dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    let type = req.session.usertype;
    let r = req.session.sessionId;
    if (type === 'student') {
      console.log("The id is", r)
      const student = await Student.findOne({id:r}).populate('courses').exec();
      console.log("Student is", student)
      if (!student) return res.status(404).send('Student not found');

      res.render('dashboard', { student });
    } else {
      // Must be admin
      const admin = await Admin.findOne({username:r});
      console.log("Student is", admin)
      if (!admin) return res.status(404).send('Student not found');
      let user = {id:admin.username}
      res.render('dashboard', { user });
    }
  } catch (error) {
    res.status(500).send('Error loading dashboard: ' + error.message);
  }
});


module.exports = router;

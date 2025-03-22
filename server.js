const express = require('express');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const mainRoutes = require('./routes/mainRoutes');

dotenv.config();

const app = express();
const session = require('express-session');
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const logger = require('./middleware/logger');
app.use(logger);
app.use(upload.none());

app.use('/', mainRoutes);
const studentRoutes = require('./routes/apiStudents');
const AdminRoutes = require('./routes/apiAdmin');
app.use('/api/student', studentRoutes);
app.use('/api/admin', AdminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

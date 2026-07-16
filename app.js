const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const classRoutes = require('./routes/classRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/classes', classRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/grades', gradeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Estudante Offline no ar' });
});

module.exports = app;

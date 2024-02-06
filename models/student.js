const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  universityRollNumber: { type: Number, unique: true },
  branch: { type: String, enum: ['Computer Science & Engineering', 'Electronics & Communications Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',] },
  collegeRollNumber: { type: String, unique: true }, // e.g. 20CSE01, 21ECE02
});

module.exports = mongoose.model('student', studentSchema);
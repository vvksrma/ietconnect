const mongoose = require('mongoose');
const Branch = require('./Branch');

const questionPaperSchema = new mongoose.Schema({
    // branch: {
    //     type: Branch.schema,
    //     required: true
    // },
    semester: {
        type: Number,
        required: true,
        min: 1, max: 8
    },
    year: {
        type: Number,
        required: true,
        min: 1998, max: new Date().getFullYear()
    },
    subject: {
        type: String,
        required: true
    },
});

const QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);

module.exports = QuestionPaper;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const branchSchema = new Schema({
    name: {
        type: String,
        // enum : [
        //     'Computer Science & Engineering',
        //     'Electronics & Communication Engineering',
        //     'Electrical Engineering',
        //     'Mechanical Engineering',
        //     'Civil Engineering',
        // ],
        required: false,
    }
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
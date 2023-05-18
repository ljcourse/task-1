const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String,
    },
    field:{
        type:String,
    }
});

const Course = mongoose.model('course', courseSchema);
module.exports = Course;
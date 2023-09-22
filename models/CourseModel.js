const mongoose = require("mongoose");

const CourseContentModel = mongoose.Schema({
    video: {
       
        trim: true,
    },
    text: {
       
        type: String,
        trim: true,
    },
    slide: {
     
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('Course', logInModel);

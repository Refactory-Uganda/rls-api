const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
    course_name: {
        type: String,
    },
    course_description: {
        type: String,
    },
    image:{
        type: String,
    },
    course_duration: {
        type: String,
    },
    course_category: {
        type: String,
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Publish"],
    },
    modules: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Module',
        },
      ],
});

module.exports = mongoose.model("Courses", CoursesSchema);




const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
    course_name: {
        type: String,
        default: null,
    },
    course_description: {
        type: String,
        default: null,
    },
    course_display_icon: {
        type: String,
        default: null,
    },
    course_duration: {
        type: String,
        default: null,
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




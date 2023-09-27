const mongoose = require("mongoose");

const CourseContentModel = mongoose.Schema({
    video: {
        type: String,
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

const adminAddCoursesSchema = new mongoose.Schema({
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
    content: [CourseContentModel], 
});

const AdminAddCourses = mongoose.model("AdminAddCourses", adminAddCoursesSchema);

// Define the Course model using the same schema
const Course = mongoose.model('Course', CourseContentModel);

module.exports = {
  AdminAddCourses,
  Course
};

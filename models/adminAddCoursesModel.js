const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("AdminAddCourses", adminAddCoursesSchema);

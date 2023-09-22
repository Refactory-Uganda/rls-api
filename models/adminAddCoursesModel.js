const mongoose = require("mongoose");

const adminAddCoursesSchema = new mongoose.Schema({
  course_name: {
    type: String,
  },
  course_description: {
    type: String,
  },
  course_display_icon: {
    type: String,
  },
  course_duration: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Publish"],
  },
});

module.exports = mongoose.model("AdminAddCourses", adminAddCoursesSchema);

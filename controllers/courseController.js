const Module = require("../models/CourseModules");

const { AdminAddCourses } = require("../models/adminAddCoursesModel");

module.exports = {
  addModules: async (req, res) => {
    try {
      const { courseId, course_model, course_name, course_description } = req.body;

      // Create a new module
      const newModule = new Module({
        course_model,
        course_name,
        course_description,
      });

      // Save the module to the database
      await newModule.save();

      // Add the module to the course's modules array
      const courseAdmin = await AdminAddCourses.findByIdAndUpdate(
        courseId,
        { $push: { modules: newModule } },
        { new: true }
      );

      res.status(200).json(courseAdmin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllCourseContent: async (req, res) => {
    try {
      const courses = await AdminAddCourses.find();

      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: "No courses found" });
      }

      const allCourseContent = courses.map((course) => course.content);

      const flattenedCourseContent = [].concat(...allCourseContent);

      res.status(200).json({
        message: "Course content retrieved successfully",
        content: flattenedCourseContent,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving course content",
        error: error.message,
      });
    }
  },
  updateCourseContent: async (res, req) => {
    try {
      const courseContent = await AdminAddCourses;
    } catch (error) {
      res.status(500).send("failed to update course Content");
    }
  },
};

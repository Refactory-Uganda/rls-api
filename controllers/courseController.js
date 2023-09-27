const Module = require("../models/CourseModules");

const  AdminAddCourses  = require("../models/adminAddCoursesModel");

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
  getAllModulesForCourse: async (req, res) => {
    try {
      const courseId  = req.params.id; 
      const course = await AdminAddCourses.findById(courseId).populate('modules');

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json(course.modules);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  deleteAllModulesForCourse: async (req, res) => {
    try {
      const courseId  = req.params.id; // Extract the course ID from the request parameters

      // Find the course by its ID
      const course = await AdminAddCourses.findById(courseId);

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Get the IDs of all modules in the course's modules array
      const moduleIds = course.modules;

      // Delete each module individually
      for (const moduleId of moduleIds) {
        await Module.findByIdAndDelete(moduleId);
      }

      // Clear the course's modules array
      course.modules = [];

      // Save the updated course without modules
      await course.save();

      res.status(200).json({ message: 'All modules deleted for the course' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

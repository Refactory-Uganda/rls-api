const Module = require("../models/CourseModules");

const  AdminAddCourses = require("../models/adminAddCoursesModel");

module.exports = {

  // this creates a new  course modules in the modules for a  course
  addModules: async (req, res) => {
    try {
      const { course_model, course_name, course_description } = req.body;

      const courseId  = req.params.id; 
      // Create a new  course module
      const newModule = new Module({
        course_model,
        course_name,
        course_description,
      });

      // Save the course module to the database
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

const moduleId = req.params.id     // Find the course by its ID
      const course = await AdminAddCourses.findById(courseId);

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      course.content.findByIdAndDelete(moduleId)

      // Save the updated course without modules
      await course.save();

      res.status(200).json({ message: 'All modules deleted for the course' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  delete: async (req, res) => {
    try {
      const CourseModule = await Module.findOneAndDelete({ _id: req.params.id });
if(!CourseModule){
  return res.status(404).json({message: 'The Course Module was not found'})
}
      res.status(200).send("successfully deleted module");
    } catch (error) {
      res.status(500).send("failed to delete module");
    }
  },
  put: async (req, res) => {
    try {
      const model = await Module
      .findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
  if(!model){
    res.status(404).json({Message:"Module not found"})
  }
      res.status(200).json(model);
    } catch (error) {
      res.status(500).send("failed to update model");
    }
  },get2: async (req, res) => {
    try {
      const module = await Module.findOne({ _id: req.params.id });
  
      if(!module){
        return res.status(404).json({error:"module not found"})
      }

      res.status(200).json(module);
    } catch (error) {
      res.status(500).send("failed to find the required model");
    }
  }, get: async (req, res) => {
    try {
      const model = await Module.find();
     
      if (!model) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.status(200).json(model);
    } catch (error) {
      res.status(500).send("failed to retrieve model");
    }
  }, post: async (req, res) => {
    try {
      const module = new Module(req.body);
      await module.save();
      res.status(200).send("Successfully added model");
    } catch (error) {
      res.status(500).send("Failed to Post module ");
    }
  },

};

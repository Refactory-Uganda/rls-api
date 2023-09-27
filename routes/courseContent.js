const express = require("express");
const router = express.Router();
const Courses = require("../controllers/courseController");

router.post("/admin/courseModules", Courses.addModules);

router.get('/:id/courseModules',Courses.getAllModulesForCourse)

router.delete(':id/deleteModule/:id', Courses.deleteAllModulesForCourse)



module.exports = router;

const express = require("express");
const router = express.Router();
const Courses = require("../controllers/courseController");

router.post("/admin/courseModules", Courses.addModules);

router.get('/:id/courseModules',Courses.getAllModulesForCourse)



module.exports = router;

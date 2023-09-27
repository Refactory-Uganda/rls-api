const express = require("express");
const router = express.Router();
const Courses = require("../controllers/courseController");

router.post("/upload", Courses.addModules);


router.put('/updateCourseContent/:id')
router.get('/:id/courseModules',Courses.getAllModulesForCourse)



module.exports = router;

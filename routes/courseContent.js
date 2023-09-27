const express = require("express");
const router = express.Router();
const Courses = require("../controllers/courseController");

router.post("/:id/upload", Courses.uploadFiles);


router.put('/updateCourseContent/:id')
router.get('/allCourseMaterails',Courses.getAllCourseContent)



module.exports = router;

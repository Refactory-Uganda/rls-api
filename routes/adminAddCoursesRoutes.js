const express = require("express");
const router = express.Router();
const Courses = require("../controllers/adminAddCoursesControllers");

router.post("/admin/addCourses", Courses.post);

router.get("/admin/addCourses", Courses.get);

router.get("/admin/addCourses/:id", Courses.get2);

router.put("/admin/addCourses/:id", Courses.put);

router.delete("/admin/addCourses/:id", Courses.delete);

module.exports = router;

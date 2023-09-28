const express = require("express");
const router = express.Router();
const Courses = require("../controllers/courseController");
const { route } = require("./courseContent");

router.post("/admin/courseModules/:id", Courses.addModules);

router.get('/admin/courseModules/:id',Courses.getAllModulesForCourse)

router.delete(':id/deleteModule/:id', Courses.deleteAllModulesForCourse)

router.post("/admin/coursemodules", Courses.post)
router.get("/admin/coursemodule",Courses.get)
router.get("/admin/coursemodule/:id",Courses.get2)
router.put("/admin/coursemodule/:id",Courses.put)
router.delete("/admin/coursemodule/:id",Courses.delete)

module.exports = router;

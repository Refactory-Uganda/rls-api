const express = require("express");
const router = express.Router();
const CourseMaterial = require("../controllers/adminAddCourseMaterialControllers");

router.post("/admin/addCourseMaterial", CourseMaterial.post);

router.get("/admin/addCourseMaterial", CourseMaterial.get);

router.get("/admin/addCourseMaterial/:id", CourseMaterial.get2);

router.put("/admin/addCourseMaterial/:id", CourseMaterial.put);

router.delete("/admin/addCourseMaterial/:id", CourseMaterial.delete);

module.exports = router;
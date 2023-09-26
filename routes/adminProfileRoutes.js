const express = require("express");
const router = express.Router();
const Profile = require("../controllers/adminProfileController");

router.post("/admin/profile", Profile.post);

router.get("/admin/profile", Profile.get);

router.get("/admin/profile/:id", Profile.get2);

router.put("/admin/profile/:id", Profile.put);

router.delete("/admin/profile/:id", Profile.delete);

module.exports = router;

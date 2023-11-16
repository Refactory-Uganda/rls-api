const express = require("express");
const router = express.Router();
const Assignment = require("../controllers/assignmentController");



router.post("/assignment", Assignment.post);
router.get('/assignment',Assignment.get);
router.get('/assignment',Assignment.get2);
router.put("/assignment/:id", Assignment.put);
router.delete("/assignment/:id", Assignment.delete);


module.exports = router;
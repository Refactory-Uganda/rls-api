const express = require('express');
const router = express.Router();
const courseContent = require('../controllers/courseController')

router.post('/:id/upload',courseContent.uploadFiles );

module.exports = router;

const express = require('express');
const Course = require('../models/CourseModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = {
  uploadFiles: async (req, res) => {
    try {
      const uploadedFiles = {
        video: req.files['video'][0].path,
        text: req.files['text'][0].path, 
        slide: req.files['slide'][0].path, 
      };

      const result = await Course.create(uploadedFiles);

      res.status(200).json({ message: 'Files uploaded successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading files', error });
    }
  },
};

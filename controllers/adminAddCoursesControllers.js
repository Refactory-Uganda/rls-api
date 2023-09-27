const express = require("express");
const AdminAddCourses = require("../models/adminAddCoursesModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

module.exports = {
  post:
    (upload.single("image"),
    async (req, res) => {
      try {
        const course = new AdminAddCourses(req.body, req.image);
        // course.image = req.file.originalname;
        await course.save();
        res.status(200).send("Successfully added course");
      } catch (error) {
        res.status(500).send("Failed to Post DATA ");
      }
    }),

  get: async (req, res) => {
    try {
      const course = await AdminAddCourses.find();
      res.status(200).json(course);
    } catch (error) {
      res.status(500).send("failed to retrieve the course");
    }
  },

  get2: async (req, res) => {
    try {
      const course = await AdminAddCourses.findOne({ _id: req.params.id });
      res.status(200).json(course);
    } catch (error) {
      res.status(500).send("failed to find the required course");
    }
  },

  put: async (req, res) => {
    try {
      const course = await AdminAddCourses.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json(course);
    } catch (error) {
      res.status(500).send("failed to update course details");
    }
  },

  delete: async (req, res) => {
    try {
      await AdminAddCourses.findOneAndDelete({ _id: req.params.id });
      res.status(200).send("successfully deleted course record");
    } catch (error) {
      res.status(500).send("failed to delete course details");
    }
  },
};

const express = require("express");
const AdminAddCourseMaterial = require("../models/adminAddCourseMaterialModel");
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
        const courseMaterial = new AdminAddCourseMaterial(req.body, req.image);
        // course.image = req.file.originalname;
        await courseMaterial.save();
        res.status(200).send("Successfully added course material");
      } catch (error) {
        res.status(500).send("Failed to Post DATA ");
      }
    }),

  get: async (req, res) => {
    try {
      const courseMaterial = await AdminAddCourseMaterial.find();
      res.status(200).json(courseMaterial);
    } catch (error) {
      res.status(500).send("failed to retrieve the course material");
    }
  },

  get2: async (req, res) => {
    try {
      const courseMaterial = await AdminAddCourseMaterial.findOne({ _id: req.params.id });
      res.status(200).json(courseMaterial);
    } catch (error) {
      res.status(500).send("failed to find the required course material");
    }
  },

  put: async (req, res) => {
    try {
      const courseMaterial = await AdminAddCourseMaterial.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json(courseMaterial);
    } catch (error) {
      res.status(500).send("failed to update course materials");
    }
  },

  delete: async (req, res) => {
    try {
      await AdminAddCourseMaterial.findOneAndDelete({ _id: req.params.id });
      res.status(200).send("successfully deleted course material record");
    } catch (error) {
      res.status(500).send("failed to delete course material");
    }
  },
};
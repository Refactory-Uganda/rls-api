const express = require("express");
const Assignment = require("../models/assignmentModel");

module.exports = {
  post: async (req, res) => {
    try {
      const assignment = new Assignment(req.body);
      await assignment.save();
      res.status(200).send("Assignment added successfully");
    } catch (error) {
      res.status(500).send("assignment not posted ");
    }
  },

  get: async (req, res) => {
    try {
      const assignment = await Assignment.find();
      res.status(200).json(assignment);
    } catch (error) {
      res.status(500).send("failed to retrieve assignment");
    }
  },

  get2: async (req, res) => {
    try {
      const assignment = await Assignment.findOne({ _id: req.params.id });
      res.status(200).json(assignment);
    } catch (error) {
      res.status(500).send("failed to find the selected assignment");
    }
  },

  put: async (req, res) => {
    try {
      const assignment = await Assignment.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json(assignment);
    } catch (error) {
      res.status(500).send("failed to update admin details");
    }
  },

  delete: async (req, res) => {
    try {
      await Assignment.findOneAndDelete({ _id: req.params.id });
      res.status(200).send("successfully deleted assignment");
    } catch (error) {
      res.status(500).send("failed to delete assignment");
    }
  },
};

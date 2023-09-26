const express = require("express");
const Profile = require("../models/adminProfileModel");

module.exports = {
  post: async (req, res) => {
    try {
      const admin = new Profile(req.body);
      await admin.save();
      res.status(200).send("Successfully added Admin");
    } catch (error) {
      res.status(500).send("Failed to Post DATA ");
    }
  },

  get: async (req, res) => {
    try {
      const admins = await Profile.find();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).send("failed to retrieve admins");
    }
  },

  get2: async (req, res) => {
    try {
      const admin = await Profile.findOne({ _id: req.params.id });
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).send("failed to find the required admin");
    }
  },

  put: async (req, res) => {
    try {
      const admin = await Profile.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).send("failed to update admin details");
    }
  },

  delete: async (req, res) => {
    try {
      await Profile.findOneAndDelete({ _id: req.params.id });
      res.status(200).send("successfully deleted admin record");
    } catch (error) {
      res.status(500).send("failed to delete admin details");
    }
  },
};

const mongoose = require("mongoose");

const adminProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  residence: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  userPhoneNumber: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  nationality: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "Admin",
  },
});

module.exports = mongoose.model("AdminProfile", adminProfileSchema);

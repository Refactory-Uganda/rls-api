const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    mark: {
        type: String,
    },
});

module.exports = mongoose.model("Assignment", AssignmentSchema);




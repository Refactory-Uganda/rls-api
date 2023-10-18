const mongoose = require("mongoose");

const CourseMaterialSchema = new mongoose.Schema({
    module_name: {
        type: String,
        default: null,
    },
    text: {
        type: String,
        default: null,
    },
    video: {
        type: String,
        default: null,
    },
    images: {
        type: String,
        default: null,
    },
    slides: {
        type: String,
        default: null,
        
    },
   
});

module.exports = mongoose.model("CourseMaterial", CourseMaterialSchema);

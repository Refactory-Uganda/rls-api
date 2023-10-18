const mongoose = require('mongoose');


const CourseModuleSchema = new mongoose.Schema({
  course_name: {
     type:String,
}
  ,
  course_description: {
     type:String,
},
// change to course module
model_name: {
     type:String,
}
});

module.exports = mongoose.model('CourseModule', CourseModuleSchema);

const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  course_name: {
     type:String,
}
  ,
  course_description: {
     type:String,
},
course_model: {
     type:String,
}
});

module.exports = mongoose.model('Module', moduleSchema);

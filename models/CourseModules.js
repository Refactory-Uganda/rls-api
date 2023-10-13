const mongoose = require('mongoose');


const moduleSchema = new mongoose.Schema({
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
},
facilitators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Facilitator' }]
});

module.exports = mongoose.model('Module', moduleSchema);

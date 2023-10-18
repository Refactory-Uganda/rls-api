const mongoose = require("mongoose")

const facilitatorSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName:{
        type :String,
    },
    email:{
        type : String,
    },
    phoneNumber:{
        type:Number,
    },
    gender:{
        type: String,
    },
    nationality:{
        type:String,
    },
    role:{
        type: String,
    },
    image:{
        type: String,
        required:true
    },
});


module.exports = mongoose.model("Facilitator", facilitatorSchema);
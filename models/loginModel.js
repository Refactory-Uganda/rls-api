const mongoose = require("mongoose")
// const passportLocalMongoose = require("passport-local-mongoose")
const bcrypt = require("bcrypt");
const logInModel = mongoose.Schema({
    username:{
        type:String,
        trim:true,
    },
    firstName:{
        type: String,
        trim:true,
    },
    secondName:{
        type: String,
        trim:true,
    },
    password:{
        type:String,
        trim:true,
    },
    gender:{
        type:String,
        trim:true,
    }, nationationality:{
        type:String,
        trim:true,
    },userGroup:{
        type:String,
        trim:true,
    },userPhoneNumber:{
        type:String,
        trim:true,
    },
})

// logInModel.plugin(passportLocalMongoose,);
module.exports = mongoose.model('User',logInModel);
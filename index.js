const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require("passport")
const session = require("express-session")
const port = process.env.PORT || 5000;
const cors = require('cors')
const LocalStrategy = require('passport-local').Strategy;
const database = require('./config/database')
const router = require('./routes/loginRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use( "/" ,router)

mongoose.connect(database.connect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to db");
});
db.on("error", (err) => {
  console.error(err);
});


// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());









app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
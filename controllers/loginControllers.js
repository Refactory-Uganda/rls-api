const express = require("express");
const User = require("../models/loginModel");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    try {
      // verfity the user passwprd
      // redirect to role of the user

      const { username, password } = req.body;

      // find user by unique email

      const user = await User.findOne({ username });
      // console.log(user);

      //if no user throw an error
      if (!user) {
        return res.status(404).send("User not found" );
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // find the user role
      let role = "";
      if (user.userGroup === "admin") {
        role = "Admin";
        // return res.redirect("/admin");
      } else if (user.userGroup === "facilitator") {
        role = "Facilitator";
      } else if (user.userGroup === "student") {
        role = "Student";
      }
      // res.status(200).send("Hello, Express!");
      res.status(200).json({ message: "Login successful", role });
    } catch (error) {
      res
        .status(400)
        .send("sorry it seems there is trouble accessing this page");
      console.log(error);
    }
  },

  signUp: async (req, res) => {
    const saltRounds = 10;
    try {
      const {username,
        firstName,
        secondName,
        password,
        gender,
        nationality,
        userGroup,
        userPhoneNumber, } = req.body;
        const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = new User({
        username,
        firstName,
        secondName,
        password,
        passwordHash,
        gender,
        nationality,
        userGroup,
        userPhoneNumber,
      });

      const data = await user.save();

      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while signing up." });
    }
  },
};

// const User = require('../models/loginModel')
// const logIn = async (req, res) => {
//     try{
//       const { username, password } = req.body;

//       const user = await User.findOne({ username });

//       if (!user) {
//           return res.status(404).json({ message: "User not found" });
//       }

//       let role = "";
//       if (user.userGroup === "admin") {
//           role = "Admin";
//       } else if (user.userGroup === "facilitator") {
//           role = "Facilitator";
//       } else if (user.userGroup === "student") {
//           role = "Student";
//       }

//       res.status(200).json({ message: "Login successful", role});

//     }
//     catch(error){
//         res.status(400).send("sorry it seems there is trouble accessing this page")
//         console.log(error)
//     }
//   };
//   const signUp = async (req, res) => {
//     try {
//       const user = new User(req.body);

//       const data = await user.save();

//       res.status(200).json(data);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'An error occurred while signing up.' });
//     }
// };

// module.exports = { logIn, signUp};

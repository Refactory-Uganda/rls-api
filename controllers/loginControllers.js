const User = require('../models/loginModel')
const logIn = async (req, res) => {
    try{
      const { username, password } = req.body;

  
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      
      let role = "";
      if (user.userGroup === "admin") {
          role = "Admin";
      } else if (user.userGroup === "facilitator") {
          role = "Facilitator";
      } else if (user.userGroup === "student") {
          role = "Student";
      }

  
      res.status(200).json({ message: "Login successful", role});
    
    }
    catch(error){
        res.status(400).send("sorry it seems there is trouble accessing this page")
        console.log(error)
    }
  };
  const signUp = async (req, res) => {
    try {
      const user = new User(req.body);

      const data = await user.save();

      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while signing up.' });
    }
};



module.exports = { logIn, signUp};
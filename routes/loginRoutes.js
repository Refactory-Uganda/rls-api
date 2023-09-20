const express = require('express');
const router = express.Router();
const login = require("../controllers/loginControllers")



router.get("/login" , login.get);

router.post("/login" , login.post);





// const {
//   logIn,
//   signUp,
// } = require('../controllers/loginControllers');

// router.post('/login', logIn);

// router.post('/signup', signUp);


module.exports = router;

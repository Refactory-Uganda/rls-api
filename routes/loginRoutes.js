const express = require('express');
const router = express.Router();
const login = require("../controllers/loginControllers")



router.get("/login" , login.get);

router.post("/login" , login.post);



module.exports = router;

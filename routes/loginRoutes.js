const express = require('express');
const router = express.Router();
const authentication  = require('../controllers/loginControllers')
/**
 * @swagger
 * components:
 *   schemas:
 *      Users:
 *       type: object  
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user 
 *         username:
 *           type: string
 *           description: The unique  username of the user
 *         firstName:
 *           type: string
 *           description: The first Name of the user
 *         SecondName:
 *           type: string
 *           description: The second Name of the user   
 *         password:
 *           type: string
 *           description: The password of the user
*         gender:
 *           type: string
 *           description: The gender of the user
 *         nationalility:
 *           type: string
 *           description: The country of the user
 *         userGroup:
 *           type: string
 *           description: The user Group of the user
 *         userPhoneNumber:
 *           type: string
 *           description: The user phone Number of the use
 *       example:
 *         id: d5fE_asz
 *         username: opini
 *         FirstName: Opini
 *         secondName: Isaac
 *         nationality : Ugandan 
 *         userGroup: student
 *         UserPhoneNumber: 256 787377567
 *         gender: Male
 *         
 */

 /**
  * @swagger
  * tags:
  *   name: Authetication
  *   description: This is used for managing the different user groups logging into the system 
  */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new course Module
 *     tags: [ Authetication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The Course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 */
router.post("/signup", authentication.signUp );

/**
 * @swagger
 * /login:
 *   post:
 *     summary: logging in the different user groups
 *     tags: [ Authetication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The Course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 */
router.post("/login", authentication.login)

module.exports = router;

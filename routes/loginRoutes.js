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
 *           description: The auto-generated id of the book
 *         course_name:
 *           type: string
 *           description: The course name
 *         course_description:
 *           type: string
 *           description: The description of course Module
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
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

const express = require("express");
const router = express.Router();
const Profile = require("../controllers/adminProfileController");


/**
 * @swagger
 * components:
 *   schemas:
 *      Admin Profile:
 *       type: object  
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Admin Profile
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
  *   name: Admin Profile
  *   description: This is used for managing the Admin Profile for the courses 
  */

/**
 * @swagger
 * /admin/profile:
 *   post:
 *     summary: Create a new course Module
 *     tags: [Admin Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin Profile'
 *     responses:
 *       200:
 *         description: The Admin Profile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin Profile'
 *       500:
 *         description: Some server error
 */

router.post("/admin/profile", Profile.post);
/**
 * @swagger
 * /admin/profile:
 *   get:
 *     summary: Returns the list of all the Admin Profile
 *     tags: [Admin Profile]
 *     responses:
 *       200:
 *         description: The list of the Admin Profile
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Add Course'
 */

router.get("/admin/profile", Profile.get);
/**
 * @swagger
 * /admin/profile/{id}:
 *   get:
 *     summary: Get the Course Module by id
 *     tags: [Admin Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The cAdmin Profile id
 *     responses:
 *       200:
 *         description: The course description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin Profile'
 *       404:
 *         description: The Course  was not found
 */

router.get("/admin/profile/:id", Profile.get2);

/**
 * @swagger
 * /admin/profile/{id}:
 *  put:
 *    summary: Update the Admin Profile by the id
 *    tags: [Admin Profile]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Admin Profile id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Admin Profile'
 *    responses:
 *      200:
 *        description: The Admin Profile was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin Profile'
 *      404:
 *        description: The Course was not found
 *      500:
 *        description: Some error happened
 */

router.put("/admin/profile/:id", Profile.put);
/**
 * @swagger
 * /admin/profile/{id}:
 *   delete:
 *     summary: Remove the Admin Profile by id
 *     tags: [Admin Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Courses id
 * 
 *     responses:
 *       200:
 *         description: The Admin Profile was deleted
 *       404:
 *         description: The Admin Profile was not found
 */
router.delete("/admin/profile/:id", Profile.delete);

module.exports = router;


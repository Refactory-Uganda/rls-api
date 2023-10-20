const express = require("express");
const router = express.Router();
const Courses = require("../controllers/coursesController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Add Courses:
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
 *         course_display_icon:
 *           type: string
 *           description: The icon that will be displayed for the course
 *         course_duration:
 *           type: string
 *           description: The duration in which the course will be undertaken
 *         status:
 *           type: string
 *           description: The status if the course is pending or published
 *       example:
 *         id: d5fE_asz
 *         course_name: The New Turing Omnibus
 *         course_description: Course description goes here
 *         course_display_icon: icon-url.png
 *         course_duration: 12 weeks
 *         status: published
 */


 /**
  * @swagger
  * tags:
  *   name: Add Courses
  *   description: This is used for managing the course mdules for the courses 
  */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course Module
 *     tags: [Add Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Add Courses'
 *     responses:
 *       200:
 *         description: The Course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Add Courses'
 *       500:
 *         description: Some server error
 */
router.post("/courses", Courses.post);
/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Returns the list of all the Courses
 *     tags: [Add Courses]
 *     responses:
 *       200:
 *         description: The list of the Courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Add Course'
 */
router.get("/courses", Courses.get);
/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get the Course Module by id
 *     tags: [Add Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 *     responses:
 *       200:
 *         description: The course description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Add Courses'
 *       404:
 *         description: The Course  was not found
 */


router.get("/courses/:id", Courses.get2);

/**
 * @swagger
 * /courses/(id):
 *  put:
 *    summary: Update the Course Module by the id
 *    tags: [Add Courses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The course id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Add Courses'
 *    responses:
 *      200:
 *        description: The course was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Add Courses'
 *      404:
 *        description: The Course was not found
 *      500:
 *        description: Some error happened
 */
router.put("/courses/:id", Courses.put);
/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Remove the Course Module by id
 *     tags: [Add Courses]
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
 *         description: The Course was deleted
 *       404:
 *         description: The Course was not found
 */
router.delete("/courses/:id", Courses.delete);

module.exports = router;

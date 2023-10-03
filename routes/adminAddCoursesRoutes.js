const express = require("express");
const router = express.Router();
const Courses = require("../controllers/adminAddCoursesControllers");
/**
 * @swagger
 * components:
 *   schemas:
 *      Add Courses:
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
  *   name: Add Courses
  *   description: This is used for managing the course mdules for the courses 
  */

/**
 * @swagger
 * /admin/addCourses:
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
router.post("/admin/addCourses", Courses.post);
/**
 * @swagger
 * /admin/addCourses:
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
router.get("/admin/addCourses", Courses.get);
/**
 * @swagger
 * /admin/addCourses/{id}:
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


router.get("/admin/addCourses/:id", Courses.get2);

/**
 * @swagger
 * /admin/addCourses/(id):
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
router.put("/admin/addCourses/:id", Courses.put);
/**
 * @swagger
 * /admin/addCourses/{id}:
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
router.delete("/admin/addCourses/:id", Courses.delete);

module.exports = router;

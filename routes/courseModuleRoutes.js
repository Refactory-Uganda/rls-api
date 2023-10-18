const express = require("express");
const router = express.Router();
const Courses = require("../controllers/courseModuleController");



/**
 * @swagger
 * components:
 *   schemas:
 *     Course Module:
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
  *   name: Course Module
  *   description: This is used for managing the course mdules for the courses 
  */



router.post("/courseModules/:id", Courses.addModules);

router.get("/courseModules/:id", Courses.getAllModulesForCourse);

router.delete(":id/deleteModule/:id", Courses.deleteAllModulesForCourse);

/**
 * @swagger
 * /coursemodule:
 *   post:
 *     summary: Create a new course Module
 *     tags: [Course Module]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course Module'
 *     responses:
 *       200:
 *         description: The course Module was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */

router.post("/coursemodule", Courses.post);
/**
 * @swagger
 * /coursemodule:
 *   get:
 *     summary: Returns the list of all the Course Modules
 *     tags: [Course Module]
 *     responses:
 *       200:
 *         description: The list of the Course Modules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course Module'
 */
router.get("/coursemodule", Courses.get);
/**
 * @swagger
 * /coursemodule/{id}:
 *   get:
 *     summary: Get the Course Module by id
 *     tags: [Course Module]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The Course Module  was not found
 */

router.get("/coursemodule/:id", Courses.get2);

/**
 * @swagger
 * /coursemodule/(id):
 *  put:
 *    summary: Update the Course Module by the id
 *    tags: [Course Module]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Course Module'
 *    responses:
 *      200:
 *        description: The course Module was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course Module'
 *      404:
 *        description: The Course Module was not found
 *      500:
 *        description: Some error happened
 */
router.put("/coursemodule/:id", Courses.put);
/**
 * @swagger
 * /coursemodule/{id}:
 *   delete:
 *     summary: Remove the Course Module by id
 *     tags: [Course Module]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Course Module id
 * 
 *     responses:
 *       200:
 *         description: The Course Module was deleted
 *       404:
 *         description: The Course Module was not found
 */

router.delete("/coursemodule/:id", Courses.delete);

module.exports = router;

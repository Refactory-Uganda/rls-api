const express = require("express");
const router = express.Router();
const Facilitator = require("../controllers/facilitatorControllers");
/**
 * @swagger
 * components:
 *   schemas:
 *      Add Facilitator:
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
  *   name: Add Facilitator
  *   description: This is used for managing the course mdules for the courses 
  */

/**
 * @swagger
 * /facilitator:
 *   post:
 *     summary: Create a new course Module
 *     tags: [Add Facilitator]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Add Facilitator'
 *     responses:
 *       200:
 *         description: The Course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Add Facilitator'
 *       500:
 *         description: Some server error
 */
router.post("/facilitator", Facilitator.post);
/**
 * @swagger
 * /facilitator/:
 *   get:
 *     summary: Returns the list of all the Courses
 *     tags: [Add Facilitator]
 *     responses:
 *       200:
 *         description: The list of the Add Facilitators
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Add Facilitator'
 */
router.get("/facilitator", Facilitator.get);
/**
 * @swagger
 * /facilitator:
 *   get:
 *     summary: Get the Course Module by id
 *     tags: [Add Facilitator]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Add Facilitator id
 *     responses:
 *       200:
 *         description: The course description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Add Facilitator'
 *       404:
 *         description: The Facilitator  was not found
 */


router.get("/facilitator/:id", Facilitator.getdetails);
/**
 * @swagger
 * /facilitator/(id):
 *   delete:
 *     summary: Remove the Course Module by id
 *     tags: [Add Facilitator]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The  Facilitator id
 * 
 *     responses:
 *       200:
 *         description: The  Facilitator was deleted
 *       404:
 *         description: The Facilitator was not found
 */
router.delete("/facilitator/:id", Facilitator.delete);
/**
 * @swagger
 * /facilitator/(id):
 *  put:
 *    summary: Update the Course Module by the id
 *    tags: [Add Facilitator]
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
 *            $ref: '#/components/schemas/Add Facilitator'
 *    responses:
 *      200:
 *        description: The course was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Add Facilitator'
 *      404:
 *        description: The  Facilitator was not found
 *      500:
 *        description: Some error happened
 */
router.put("/facilitator/:id", Facilitator.put);

module.exports = router;

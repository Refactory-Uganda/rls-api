const express = require("express");
const router = express.Router();
const CourseMaterial = require("../controllers/adminAddCourseMaterialControllers");
/**
 * @swagger
 * components:
 *   schemas:
 *     Course Material:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the course Material
 *         module_name:
 *           type: string
 *           description: The course name of the course Material for posting for
 *         text:
 *           type: string
 *           description: The text for the course Material
 *         video:
 *           type: string
 *           description: The video for the course module
 *         images:
 *           type: document
 *           description: The images used in the video
 *         slides:
 *           type: file
 *           description: The slides used in the video
 *       example:
 *         id: d5fE_asz
 *         module_name: The New Turing Omnibus
 *         text: Alexander K. Dewdney
 *         slides: slides for used in the video
 *         images: images for the vidoe
 */

 /**
  * @swagger
  * tags:
  *   name: Course Material
  *   description: This is used for managing the Course Materails for the courses 
  */

/**
 * @swagger
 * /admin/addCourseMaterial:
 *   post:
 *     summary: Create a new course Module
 *     tags: [Course Material]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course Material'
 *     responses:
 *       200:
 *         description: The course Module was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course Material'
 *       500:
 *         description: Some server error
 */
router.post("/admin/addCourseMaterial", CourseMaterial.post);
/**
 * @swagger
 * /admin/addCourseMaterial:
 *   get:
 *     summary: Returns the list of all the Course Material
 *     tags: [Course Material]
 *     responses:
 *       200:
 *         description: The list of the Course Material
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course Material'
 */


router.get("/admin/addCourseMaterial",CourseMaterial.get);
/**
 * @swagger
 * /admin/addCourseMaterial/{id}:
 *   get:
 *     summary: Get the Course Material by id
 *     tags: [Course Material]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course Material id
 *     responses:
 *       200:
 *         description: The course Material description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course Material'
 *       404:
 *         description: The Course Material was not found
 */
router.get("/admin/addCourseMaterial/:id", CourseMaterial.get2);

/**
 * @swagger
 * /admin/addCourseMaterial/(id):
 *  put:
 *    summary: Update the Course Materiale by the id
 *    tags: [Course Material]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The course Material  id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Course Material'
 *    responses:
 *      200:
 *        description: The course Module was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course Material'
 *      404:
 *        description: The Course Material was not found
 *      500:
 *        description: Some error happened
 */

router.put("/admin/addCourseMaterial/:id", CourseMaterial.put);

/**
 * @swagger
 * /admin/addCourseMaterial/{id}:
 *   delete:
 *     summary: Remove the Course Module by id
 *     tags: [Course Material]
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
router.delete("/admin/addCourseMaterial/:id", CourseMaterial.delete);

module.exports = router;
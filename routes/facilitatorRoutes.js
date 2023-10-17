const express = require("express");
const router = express.Router();
const Facilitator = require("../controllers/facilitatorControllers");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./public/images/facilitators");
    },
    filename:(req, file, cb)=>{
      const name = file.originalname.toString().split(" ").join("_")
        cb(null ,Date.now()+"_"+name);
    },
});
let upload = multer({storage: storage});

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
 * /admin/addFacilitator:
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
router.post("/admin/addFacilitator",upload.single('image'), Facilitator.post);
/**
 * @swagger
 * /admin/addFacilitator/:
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
router.get("/admin/addFacilitator", Facilitator.get);
/**
 * @swagger
 * /admin/addFacilitator:
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


router.get("/admin/addFacilitator/:id", Facilitator.getdetails);
/**
 * @swagger
 * /admin/addFacilitator/(id):
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
router.delete("/admin/addFacilitator/:id", Facilitator.delete);
/**
 * @swagger
 * /admin/addFacilitator/(id):
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
router.put("/admin/addFacilitator/:id", Facilitator.put);
router.post("/Module/:moduleId/facilitators/:facilitatorId")

module.exports = router;

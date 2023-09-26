const express = require("express");
const router = express.Router();
const Facilitator = require("../controllers/facilitatorControllers");

router.post("/admin/addFacilitator", Facilitator.post);
router.get("/admin/addFacilitator", Facilitator.get);
router.get("/admin/addFacilitator/:id", Facilitator.getdetails);
router.delete("/admin/addFacilitator/:id", Facilitator.delete);
router.put("/admin/addFacilitator/:id", Facilitator.put)

module.exports = router;
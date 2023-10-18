const express = require("express");
const Facilitator  = require("../models/facilitatorModel");
const Module = require("../models/CourseModules");



module.exports = {
    post: async(req, res)=>{
        const { moduleId, facilitatorId } = req.params;     
        try {
            const module = await Module.findById(moduleId);
            const facilitator = await Facilitator.findById(facilitatorId);
        
            if (!module || !facilitator) {
              return res.status(404).json({ message: 'Module or facilitator not found' });
            }

            if (module.facilitators.includes(facilitator._id)) {
                return res.status(400).json({ message: 'Facilitator already assigned to the course' });
              }

              module.facilitators.push(facilitator._id);
              await module.save();
          
              res.json({ message: 'Facilitator assigned to the course successfully' });
            } catch (error) {
              res.status(500).json({ message: 'Internal server error' });
            }
    }
}
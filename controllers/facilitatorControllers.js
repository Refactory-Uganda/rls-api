const express = require('express')
const Facilitator  = require("../models/facilitatorModel");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./public/images");
    },
    filename:(req, file, cb)=>{
        cb(null ,file.originalname);
    },
});
let upload = multer({storage: storage});


module.exports = {
    post: 
    async(req,res)=>{
        try{
            const facilitator = new Facilitator(req.body);
            await facilitator.save();
            res.status(200).send("Facilitator added as a successfully");
        } catch (error){
            res.status(500).send("facilitator cant be added");
        }
},
    get: async(req,res)=>{
        try{
            const facilitator = await Facilitator.find();
            res.status(200).json(facilitator);

        } catch (error){
            res.status(500).send("cant find facilitators");
        }
    },

    put: async(req,res)=>{
      try{  const updatedFacilitator = await Facilitator.findOneAndUpdate(
            {id: req.params.id},
            req.body,
            {new: true}
        );
        if (!updatedFacilitator){
            return res.status(401).send({message:"update didnot happen"});
        }
        res.status(200).send({message: "Facilitator details updated"});
    } catch(error){
        res.status(500).send({error: "error updating facilitator"});
    }
    },

    delete: async(req,res)=>{
        try{
            await Facilitator.findOneAndDelete({id: req.params.id});
            res.status(200).send('facilitator deleted')
        } catch(error){
            res.status(500).send("failed to delete facilitator");
        }
    },
    getdetails: async(req, res)=>{
        try {
            const facilitator = await Facilitator.findOne({id: req.params.id });
            res.status(200).json(facilitator);
          } catch (error) {
            res.status(500).send("cannot find facilitator");
          }
    }
}
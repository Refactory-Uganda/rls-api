const express = require('express')
const Facilitator  = require("../models/facilitatorModel");
const file= require("../routes/facilitatorRoutes.js")
const path= require('path');

module.exports = {

    post:
      async function(req,res){
        try{
            const fields=req.body
            const image = req.file.path
            const facilitator = new Facilitator({...fields,image});
            console.log(facilitator)
            await facilitator.save();
            res.status(200).send("Facilitator added as a successfully");
        } catch (error){
            res.status(500).send("facilitator cant be added"+"    " +error);
            console.log(error)
          
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
            await Facilitator.findOneAndDelete({_id: req.params.id});
            res.status(200).send('facilitator deleted')
        } catch(error){
            res.status(500).send("failed to delete facilitator");
        }
    },
    getdetails: async(req, res)=>{
        try {
            const facilitator = await Facilitator.findOne({_id: req.params.id });
            res.status(200).json(facilitator);
          } catch (error) {
            res.status(500).send("cannot find facilitator");
          }
    }
}
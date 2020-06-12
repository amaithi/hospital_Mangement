const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const async = require("async");
const rider = require('../../models/rider');
const nodemailer = require('nodemailer');
const multer = require('multer');
const validateRiderInput = require("../../validation/rider");
router.get('/test1', (req, res) => {
    res.json({
        statue: "success"
    });
});

  router.post('/wakaride-rider-save', (req, res) => {
    console.log('---------')
    // console.log(req.body.selectedOption.value)
    const { errors, isValid } = validateRiderInput(req.body, "register");
    console.log(isValid)
    if (!isValid) {
        console.log('Error---------')
      return res.status(400).json(errors);
    }else{
        
      const riderSchema = new rider(
          {
            name:req.body.name,
            email:req.body.email,
            subject:req.body.subject,
            message:req.body.message
          }
        );
        console.log('saveeeeeeeeee');
        riderSchema.save().then(saveddata=>{
          console.log("saved",saveddata)
          res.json({
            status: true,
            message:
              "Details send successfully. Redirect to Sign In ",
          });
      
        })
    }
  

})
router.get('/wakaride-rider-get', (req, res) => {
    rider.find({}).then(user => {
        if (user) {
            return res.status(200).send(user);
            console.log(user, 'uesrezzzzzzz');
        }
    });
})
router.get("/eggroup-rider-get/:id", (req, res) => {
    const id = req.params.id;
    rider.findById(id).then((resp) => {
      if (resp) {
        return res.status(200).send(resp);
      }
    });
  });
router.post('/eggroup-deleteinformation', (req, res) => {
    var id = req.body._id;
    Contactus.deleteOne({
        _id: req.body._id
    }).then(contactusdata => {
        console.log(contactusdata, 'currencydatarfgfhgjyghj');
        if (contactusdata) {
            console.log(id, 'idsssssssssss');
            return res.status(200).json({
                message: 'Category data deleted successfully. Refreshing data...'
            })
        }
    });
})


module.exports = router;
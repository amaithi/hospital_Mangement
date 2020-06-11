const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const async = require("async");
const contactus = require('../../models/contactus');
const nodemailer = require('nodemailer');
const multer = require('multer');
const validateContactInput = require("../../validation/contactus");
router.get('/test1', (req, res) => {
    res.json({
        statue: "success"
    });
});

  router.post('/wakaride-contact-save', (req, res) => {
    console.log('---------')
    // console.log(req.body.selectedOption.value)
    const { errors, isValid } = validateContactInput(req.body, "register");
    console.log(isValid)
    if (!isValid) {
        console.log('Error---------')
      return res.status(400).json(errors);
    }else{
        
      const contactusSchema = new contactus(
          {
            name:req.body.name,
            email:req.body.email,
            subject:req.body.subject,
            message:req.body.message
          }
        );
        console.log('saveeeeeeeeee');
        contactusSchema.save().then(saveddata=>{
          console.log("saved",saveddata)
          res.json({
            status: true,
            message:
              "Details send successfully",
          });
      
        })
    }
  

})
router.get('/wakaride-contactus-get', (req, res) => {
    contactus.find({}).then(user => {
        if (user) {
            return res.status(200).send(user);
            console.log(user, 'uesrezzzzzzz');
        }
    });
})
router.get("/eggroup-contactus-get/:id", (req, res) => {
    const id = req.params.id;
    Contactus.findById(id).then((resp) => {
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
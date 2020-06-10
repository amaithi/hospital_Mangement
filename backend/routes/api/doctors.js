const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const async = require("async");
const nodemailer = require('nodemailer');
const multer = require('multer');
const doctors = require('../../models/doctors');
router.get('/test1', (req, res) => {
    res.json({
        statue: "success"
    });
});
// router.get('/doctors', (req, res) => {
//     res.json({
//         statue: "success"
//     });
// });
router.get('/doctors', (req, res) => {
    doctors.find({}).then(user => {
        if (user) {
            return res.status(200).send(user);
            console.log(user, 'uesrezzzzzzz');
        }
    });
});
router.get("/doctor-profile/:id", (req, res) => {
    var id = req.params.id;
    doctors.findById(id).then((result) => {
      res.json(result);
    });
  });
  
  router.post("/doctor-update", (req, res) => {
    var id = req.body.id;
    doctors.findById(id).then((result) => {
        req.body.profileLink = 'doctor-profile';
        req.body.last = req.body.last;
        const doctorsSchema = new doctors({
            img:    req.body.img,
            name:req.body.name,
            first:  req.body.name,
            last:  req.body.last,
            role:   req.body.role,
            gender: req.body.gender,
            address:    req.body.address,
            profileLink:    "doctor-profile",
            social: req.body.social
        });
        doctors.findByIdAndUpdate(id, req.body, {
            new: true
          }, function (err, user) {
            return res.status(200).json({
              message: 'Profile Add Succesfully',
              success: true
            });
          });
        // doctorsSchema.save(function (err, data) {
        //     console.log('sdfsdf');
        // });
     // res.json(result);
    });
  });
  router.post("/doctor-add", (req, res) => {
    var id = req.body.id;
        req.body.profileLink = 'doctor-profile';
        req.body.last = req.body.last;
        const doctorsSchema = new doctors({
            img:    req.body.img,
            name:req.body.name,
            first:  req.body.name,
            last:  req.body.last,
            role:   req.body.role,
            gender: req.body.gender,
            address:    req.body.address,
            profileLink:    "doctor-profile",
            social: req.body.social
        });
      
        doctorsSchema.save(function (err, data) {
            console.log('sdfsdf');
        });
     res.json(result);
  
  });

module.exports = router;
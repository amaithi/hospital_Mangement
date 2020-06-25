const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const async = require("async");
const nodemailer = require('nodemailer');
const multer = require('multer');
const patients = require('../../models/patients');
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
router.get('/patients', (req, res) => {
    patients.find({}).then(user => {
        if (user) {
            return res.status(200).send(user);
            console.log(user, 'uesrezzzzzzz');
        }
    });
});
router.get('/patients/:id', (req, res) => {
  patients.find({hospitalId:req.params.id}).then(user => {
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
  
  router.post("/patient-update", (req, res) => {
    var id = req.body.id;
       
        patients.findByIdAndUpdate(id, req.body, {
            new: true
          }, function (err, user) {
            return res.status(200).json({
              message: 'Profile Add Succesfully',
              success: true
            });
    });
});
  router.post("/doctor-add", (req, res) => {
    var id = req.body.id;
        req.body.profileLink = 'doctor-profile';
        req.body.last = req.body.last;
        const doctorsSchema = new doctors({
            img:    req.body.img,
            name:req.body.name,
            id:  req.body.id,
            age:   req.body.age,
            address:    req.body.address,
            gender: req.body.gender,
            number:    req.body.number,
            lastVisit:    req.body.lastVisit,
            status:    req.body.status
        });
      
        doctorsSchema.save(function (err, data) {
            console.log('sdfsdf');
        });
     res.json(result);
  
  });

module.exports = router;
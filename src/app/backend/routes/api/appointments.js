const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const async = require("async");
const nodemailer = require('nodemailer');
const multer = require('multer');
const appointments = require('../../models/appointments');
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
router.get('/listAppointment', (req, res) => {
    appointments.find({}).then(user => {
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
router.post("/appointment-delete", (req, res) => {
  appointments.deleteOne({
      _id: req.body._id
    }).then(user => {
      if (user) {
        return res.status(200).json({
          message: 'User deleted successfully. Refreshing data...',
          success: true
        })
      }
    });
});
  router.post("/appointment-update", (req, res) => {
    var id = req.body.id;
    if(id !=''){
      appointments.findById(id).then((result) => {
        // const doctorsSchema = new appointments({
        //     img:    req.body.img,
        //     name:req.body.name,
        //     first:  req.body.name,
        //     last:  req.body.last,
        //     role:   req.body.role,
        //     gender: req.body.gender,
        //     address:    req.body.address,
        //     profileLink:    "doctor-profile",
        //     social: req.body.social
        // });
        appointments.findByIdAndUpdate(id, req.body, {
            new: true
          }, function (err, user) {
            return res.status(200).json({
              message: 'Profile Add Succesfully',
              success: true
            });
          });
        });
      }else{
        const appointmentsSchema = new appointments({
          img:    req.body.img,
          name: req.body.name,
          email:   req.body.email,
          number:    req.body.number,
          date:    req.body.date,
          fromTo:    req.body.fromTo,
          doctor:  req.body.doctor,
          injury:     req.body.injury
        });
        appointmentsSchema.save(function (err, data) {
          res.json(data);
      });
        
      }
    
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
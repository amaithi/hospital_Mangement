const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
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
// });patient-get 
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
router.get('/patients-status-pending/:id', (req, res) => {
  patients.find({hospitalId:req.params.id,status:'Pending'}).then(user => {
      if (user) {
          return res.status(200).send(user);
          console.log(user, 'uesrezzzzzzz');
      }
  });
});
router.get('/patients-status-pending', (req, res) => {
  patients.find({status:'Pending'}).then(user => {
      if (user) {
          return res.status(200).send(user);
          console.log(user, 'uesrezzzzzzz');
      }
  });
});
router.get('/patients-status-approved', (req, res) => {
  patients.find({hospitalId:req.params.id,status:'approved'}).then(user => {
      if (user) {
          return res.status(200).send(user);
          console.log(user, 'uesrezzzzzzz');
      }
  });
});
router.get('/patients-status-approved/:id', (req, res) => {
  patients.find({status:'approved'}).then(user => {
      if (user) {
          return res.status(200).send(user);
          console.log(user, 'uesrezzzzzzz');
      }
  });
});
router.get('/patient-get', (req, res) => {
  patients.find({}).then(user => {
      if (user) {
          return res.status(200).send(user);
          console.log(user, 'uesrezzzzzzz');
      }
  });
});
router.get('/patient-get/:id', (req, res) => {
  patients.find({hospitalId:req.params.id}).then(user => {
      if (user) {
          return res.status(200).send(user);
          console.log(user, 'uesrezzzzzzz');
      }
  });
});
router.post("/patient-delete", (req, res) => {
  patients.deleteOne({
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

router.get("/doctor-profile/:id", (req, res) => {
    var id = req.params.id;
    doctors.findById(id).then((result) => {
      res.json(result);
    });
  });
  
  router.post("/patient-update", (req, res) => {
    var id = req.body._id;
       
        patients.findByIdAndUpdate(id, req.body, {
            new: true
          }, function (err, user) {
            return res.status(200).json({
              message: 'Profile Add Succesfully',
              success: true
            });
    });
});
  router.post("/patient-add", (req, res) => {
    var id = req.body.id;
      
        const patientsSchema = new patients({
            img:    req.body.img,
            name:req.body.name,
            id:  req.body.id,
            age:   req.body.age,
            address:    req.body.address,
            gender: req.body.gender,
            number:    req.body.number,
            lastVisit:    req.body.lastVisit,
            status:    req.body.status,
            profileLink:req.body.profileLink,
            label:req.body.label,
            hospitalId: req.body.hospitalId,
        });
      
        patientsSchema.save(function (err, data) {
          if(err) return err;
          res.json({"message":"patient Data Added Successfully"});
        });
    
  
  });

module.exports = router;
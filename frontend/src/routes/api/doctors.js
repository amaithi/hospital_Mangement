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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'assets/doctor')
},
filename: function (req, file, cb) {
  console.log(file)
  cb(null, Date.now() + '-' +file.originalname );
}
})

const fileFilter = (req, file, cb, res) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb("File format should be PNG,JPG,JPEG", false);
    // if validation failed then generate error
  }
};

var upload = multer({ storage: storage, fileFilter: fileFilter }).fields([
  { name: "photo", maxCount: 1 },
  { name: "carregoFile", maxCount: 1 },
  { name: "cofFile", maxCount: 1 },
  { name: "insurancepaperFile", maxCount: 1 },
  { name: "pslFile", maxCount: 1 }
]);

router.get('/doctors', (req, res) => {
    doctors.find({}).then(user => {
        if (user) {
            return res.status(200).send(user);
            console.log(user, 'uesrezzzzzzz');
        }
    });
});
router.get('/doctors/:id', (req, res) => {
  doctors.find({hospitalId:req.params.id}).then(user => {
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
  router.get("/doctor-profile", (req, res) => {
    var id = req.params.id;
    doctors.findById({}).then((result) => {
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
    upload(req, res, function (err) {
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
   res.json({message:'Data send Successfully'});
    });
  
  
  });

module.exports = router;
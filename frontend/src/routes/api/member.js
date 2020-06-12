const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const async = require("async");
const Member = require('../../models/member');
const nodemailer = require('nodemailer');
const multer = require('multer');
var multipart = require('parse-multipart');
const validateMemberInput = require("../../validation/member");

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, './public')
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

// var upload = multer({ storage: storage }).array('file');;
var upload = multer({ storage: storage, fileFilter: fileFilter }).fields([
  { name: "drivingLicePicFile", maxCount: 1 },
  { name: "carregoFile", maxCount: 1 },
  { name: "cofFile", maxCount: 1 },
  { name: "insurancepaperFile", maxCount: 1 },
  { name: "pslFile", maxCount: 1 }
]);


router.get('/test2', (req, res) => {
    res.json({
        statue: "success"
    });
});

  router.post('/wakaride-member-save', (req, res) => {
    console.log(req)
    // 
   
    // if(true){
      upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        } else{
          // console.log(req.files.cofFile[0]);
          const { errors, isValid } = validateMemberInput(req.body, "register");
          if(isValid){
            const member = new Member(
              {
                first: req.body.first,
                last: req.body.last,
                mobile: req.body.mobile,
                email: req.body.email,
                dob: req.body.dob,
                language: req.body.language,
                city: req.body.city,
                postalcode: req.body.postalcode,
                drivinglice: req.body.drivinglice,
                vehicleIns: req.body.vehicleIns,
                inscompany: req.body.inscompany,
                vehiclemake: req.body.vehiclemake,
                vehicleyear: req.body.vehicleyear,
                vehiclecolor: req.body.vehiclecolor,
                vehiclemodel: req.body.vehiclemodel,
                vehiclekm: req.body.vehiclekm,
                vehicleplateno: req.body.vehicleplateno,
                acnumber: req.body.acnumber,
                bankname: req.body.bankname,
                branchname: req.body.branchname,
                bankname: req.body.bankname,
                drivingLicePic: req.files.drivingLicePicFile[0].filename,
                carrego: req.files.carregoFile[0].filename,
                cof: req.files.cofFile[0].filename,
                insurancepaper: req.files.insurancepaperFile[0].filename,
                psl: req.files.pslFile[0].filename,
                destination:  'public',
              }
            );
            member.save().then(saveddata=>{
              console.log("savvvvvvvvvvv");
              return res.json({
                status: true,
                message:
                  "Details send successfully",
              });
          
            });
          }
          if(!isValid){
            return res.status(400).json(errors);
          }
         // console.log(isValid);
          
        }
      })
    // }
    
})
router.get('/wakaride-member-get', (req, res) => {
    Member.find({}).then(user => {
        if (user) {
            return res.status(200).send(user);
         //   console.log(user, 'uesrezzzzzzz');
        }
    });
})

router.post('/wakaride-member-upload', (req, res) => {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err);
           } else if (err) {
               return res.status(500).json(err)
              console.log(err);
           }else{
             
            var resObj={
              status:200,
              message:"Image Stored Successfully"
            }
            console.log(req.files)
            return res.status(200).send(req.files)
           }
           

    })
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
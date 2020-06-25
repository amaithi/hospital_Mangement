const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const async = require("async");
const nodemailer = require('nodemailer');
const multer = require('multer');
const payments = require('../../models/payments');
const Nexmo = require('nexmo');
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
router.get("/payment-sms",(req,res)=>{
  const nexmo = new Nexmo({
    apiKey: '4a8904bd',
    apiSecret: 'jJETRkNhM1OdtYez',
  });
  
  const from = '919659167747';
  const to = '919659167747';
  const text = 'Hello from Vonage SMS API';
  
  nexmo.message.sendSms(from, to, text);
  res.json({"message":"patient Data Added Successfully"});
})

router.post("/payments-add", (req, res) => {
  var id = req.body.id;
    
      const paymentsSchema = new payments({
          billNo:  req.body.billNo,
          billDate:  req.body.billDate,
          patient: req.body.patient,
          doctor:  req.body.doctor,
          charges:  req.body.charges,
          tax:  req.body.tax,
          discount:  req.body.discount,
          total:  req.body.total,
          patientId:  req.body.patientId,
          doctorId: req.body.doctorId,
          hospitalId: req.body.hospitalId,
         });
    
      paymentsSchema.save(function (err, data) {
        if(err) return err;
        res.json({"message":"patient Data Added Successfully"});
      });
  

});
router.get('/patients', (req, res) => {
  payments.find({}).then(user => {
        if (user) {
            return res.status(200).send(user);
            console.log(user, 'uesrezzzzzzz');
        }
    });
});
router.get('/patients/:id', (req, res) => {
  payments.find({hospitalId:req.params.id}).then(user => {
        if (user) {
            return res.status(200).send(user);
            console.log(user, 'uesrezzzzzzz');
        }
    });
});
router.get('/payments-get', (req, res) => {
  payments.find({}).then(user => {
      if (user) {
          return res.status(200).send(user);
          console.log(user, 'uesrezzzzzzz');
      }
  });
});
router.get('/payments-get/:id', (req, res) => {
  payments.find({hospitalId:req.params.id}).then(user => {
      if (user) {
          return res.status(200).send(user);
          console.log(user, 'uesrezzzzzzz');
      }
  });
});
router.post("/patient-delete", (req, res) => {
  payments.deleteOne({
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


module.exports = router;
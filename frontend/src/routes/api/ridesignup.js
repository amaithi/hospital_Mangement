const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const async = require("async");
const ridesignup = require('../../models/ridesignup');
const nodemailer = require('nodemailer');
const multer = require('multer');
var moment = require("moment");
const validateRiderSignupInput = require("../../validation/ridesignup");
const validateLoginInput = require("../../validation/riderlogin");
var voucher_codes = require('coupon-code');
router.get('/test1', (req, res) => {
    res.json({
        statue: "success"
    });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
      return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  ridesignup.findOne({ 'email':email }).then(user => {
      if (!user) {
          return res.status(404).json({ email: 'Email not found' });
      }
     if(password== user.password){
          if (password== user.password) {
              const payload = {
                  id: user.id,
                  name: user.name
              };
              jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {
                      expiresIn: 31556926 // 1 year in seconds
                  },
                  (err, token) => {
                      res.json({
                          success: true,
                          token: 'Bearer ' + token
                      });
                  }
              );
          } else {
              return res
                  .status(400)
                  .json({ password: 'Password incorrect' });
          }
      };
    });
});

  router.post('/wakaride-riderreg-save', (req, res) => {
    console.log('---------')
    // console.log(req.body.selectedOption.value)
    const { errors, isValid } = validateRiderSignupInput(req.body, "register");
    console.log(isValid)
    if (!isValid) {
        console.log('Error---------')
      return res.status(400).json(errors);
    }
    else{
      ridesignup.findOne({ email: req.body.email,role:req.body.role }).then((user) => {
        if (user) {
          return res.status(400).json({
            message: "Email already existss",
          });
        }else{
          const ridesignupSchema = new ridesignup(
            {
              username:req.body.username,
              email:req.body.email,
              password:req.body.password,
              cpassword:req.body.cpassword,
              role:req.body.role
            }
          );
          console.log('saveeeeeeeeee');
          ridesignupSchema.save().then(saveddata=>{
            console.log("saved",saveddata)
            res.json({
              status: true,
              message:
                "Details send successfully. Redirect to Registration Page",
            });
        
          })
        }
      })
      
    }
  

    //  userref = req.body.referalcode;
    // //userref = '';

    // riderreg.findOne({ email: req.body.email }).then((user) => {
    //   if (user) {
    //     return res.status(400).json({
    //       email: "Email already existss",
    //     });
    //   } else {
  
  
    //     const referralcode = voucher_codes.generate();
  
    //     const newUser = new riderreg({
    //       username:req.body.username,
    //         email:req.body.email,
    //         password:req.body.password,
    //         cpassword:req.body.cpassword,
    //         referalcode: userref
    //     });
  
    //     bcrypt.genSalt(10, (err, salt) => {
    //       bcrypt.hash(newUser.password, salt, (err, hash) => {
    //         if (err) throw err;
    //         newUser.password = hash;
    //         var curuser = {};
    //         async.waterfall(
    //           [
  
    //             function (done) {
    //               if (userref == '') {
    //                 done();
    //               } else {
    //                 riderreg.findOne({
    //                   referencecode: userref
    //                 }).exec(function (error, userreferal) {
    //                   if (!error) {
    //                     referaluserid = userreferal._id
    //                     referralemail= userreferal.email
    //                     newUser.referaluserid = referaluserid;
    //                     newUser.referaluseremail=referralemail
    //                   }
    //                   done()
    //                 })
  
    //               }
  
    //             },
    //          function (done) {
    //               newUser
    //                 .save()
    //                 .then((result) => {
    //                   curuser = result;
    //                   done();
    //                 })
    //                 .catch((err) => console.log(err));
    //             },
    //             function (done) {
    //               riderreg.findOne({
    //                 email: req.body.email,
    //               }).then((user) => {
    //                 var jsonfilter = {
    //                   identifier: "activate_register_user",
    //                 }; 
    //                 var logo =  +"/uploads/logoadmin.png";
    //                 Emailtemplates.findOne(
    //                   jsonfilter,
    //                   {
    //                     _id: 0,
    //                   },
    //                   function (err, templates) {
    //                     if (templates) {
    //                       if (templates.content) {
    //                         templateData = templates;
    //                         templateData.content = templateData.content.replace(
    //                           /##templateInfo_name##/g,
    //                           user.email
    //                         );
    //                         templateData.content = templateData.content.replace(
    //                           /##templateInfo_appName##/g,
    //                           keys.siteName
    //                         );
    //                         templateData.content = templateData.content.replace(
    //                           /##templateInfo_logo##/g,
    //                           logo
    //                         );
    //                         var link_html =
    //                           keys.frontUrl + "activate/" + user._id;
    //                         templateData.content = templateData.content.replace(
    //                           /##templateInfo_url##/g,
    //                           link_html
    //                         );
    //                         done();
    //                       }
    //                     }
    //                   }
    //                 );
    //               });
    //             },
  
    //             function (done) {
    //               var smtpConfig = {
    //                 service: keys.serverName,
    //                 auth: {
    //                   user: keys.email,
    //                   pass: keys.password,
    //                 },
    //               };
    //               var transporter = nodemailer.createTransport(smtpConfig);
    //               // var transporter = nodemailer.createTransport({
    //               //   service: "gmail",
    //               //   auth: {
    //               //     user: "alwinmatthew@britisheducationonline.org",
    //               //     pass: "13071997"
    //               //   },
    //               //   host: "smtp.gmail.com",
    //               //   port: "587",
    //               //   secure: false
    //               // });
  
    //               var mailOptions = {
    //                 from:
    //                   keys.fromName +
    //                   "<" +
    //                   "amaithisingam@gmail.com" +
    //                   ">", // sender address
    //                 to: req.body.email, // list of receivers
    //                 subject: templateData.subject, // Subject line
    //                 html: templateData.content, // html body
    //               };
    //               transporter.sendMail(mailOptions, function (error, info) {
    //                 if (error) {
    //                   return console.log(error);
    //                 }
    //               });
    //               done();
    //             },
    //             function (done) {
    //               currency.find({}).then((currencydetails) => {
    //                 if (currencydetails) {
    //                   var currencyAddress = "";
    //                   var account = web3.eth.accounts.create();
    //                   // update address
    //                   currencyAddress = account.address;
    //                   var privateKey = account.privateKey;
  
    //                   var encrypted = CryptoJS.AES.encrypt(
    //                     privateKey,
    //                     "GenesisOne"
    //                   ).toString();
  
    //                   FeeTable.findOne({}).then((feedetails) => {
    //                     for (var i = 0; i < currencydetails.length; i++) {
    //                       if (currencydetails[i].currencySymbol == "ETH") {
    //                         const newethAssets = new Assets({
    //                           userId: curuser._id,
    //                           balance: 0,
    //                           currency: currencydetails[i].currencyName,
    //                           currencySymbol: currencydetails[i].currencySymbol,
    //                           tempcurrency: tempbalance,
    //                           privateKey: encrypted,
    //                           currencyAddress: currencyAddress,
    //                         });
  
    //                         newethAssets.save(function (err, data) {
    //                           if (err) {
    //                             console.log("Error in new assets add", err);
    //                           }
  
    //                           const newinvest = new Assets({
    //                             userId: data.userId,
    //                             balance: 0, 
    //                             currency:"Invested",
    //                             currencySymbol:"InvGO"
    //                           })
    //                           newinvest.save(function(err,data){
    //                             if(err){
    //                               console.timeLog("Error")
    //                             }
    //                           })
  
  
  
                              
    //                         });
    //                       }
  
    //                       var tempbalance =
    //                         currencydetails[i].currencySymbol == "BTC"
    //                           ? feedetails.signup_bonus
    //                           : "0";
  
    //                       // if (currencydetails[i].currencySymbol == "BTC") {
    //                       //   const newAssets = new Assets({
    //                       //     userId: curuser._id,
    //                       //     balance: 0,
    //                       //     currency: currencydetails[i].currencyName,
    //                       //     currencySymbol: currencydetails[i].currencySymbol,
    //                       //     tempcurrency: tempbalance,
    //                       //     privateKey: encrypted,
    //                       //     currencyAddress: currencyAddress,
    //                       //   });
    //                       //   console.log("NEw assetts", newAssets);
  
    //                       //   newAssets.save(function (err, data) {
    //                       //     if (err) {
    //                       //       console.log("Error in new assets add", err);
    //                       //     }
    //                       //   });
    //                       // }
  
    //                       if (currencydetails[i].currencySymbol == "GO") {
    //                         const newGOassets = new Assets({
    //                           userId: curuser._id,
    //                           balance: 0,
    //                           currency: currencydetails[i].currencyName,
    //                           currencySymbol: currencydetails[i].currencySymbol,
    //                           tempcurrency: tempbalance,
    //                           privateKey: encrypted,
    //                           currencyAddress: currencyAddress,
    //                         });
  
    //                         newGOassets.save(function (err, data) {
    //                           if (err) {
    //                             console.log("Error in new assets add", err);
    //                           }
    //                         });
    //                       }
                          
    //                     }
  
  
    //                   });
    //                 } else {
    //                   console.log("else");
    //                 }
    //               });
    //             },
    //           ],
    //           function (err) {}
    //         );
    //         // return res.status(200).json({
    //         //   message:
    //         //     "Activation mail sent. Check your Registered email to activate",
    //         // });
    //       });
    //     });
    //   }
    // });
});



router.post('/wakaride-login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
      return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  ridesignup.findOne({ 'email':email}).then(user => {
    console.log(user)
      if (!user) {
          return res.status(404).json({ email: 'Email not found' });
      }
      if(!(password == user.password)){
        return res
        .status(400)
        .json({ password: 'Password incorrect' });
      }else{
        return res
        .status(200)
        .json({data:'Login Successful' });
      }
      // bcrypt.compare(password, user.password).then(isMatch => {
      //   if (err) { throw (err); }
      //   console.log(password == user.password)
      //     if (isMatch) {
      //         const payload = {
      //             id: user.id,
      //             name: user.name
      //         };
      //         jwt.sign(
      //             payload,
      //             keys.secretOrKey,
      //             {
      //                 expiresIn: 31556926 // 1 year in seconds
      //             },
      //             (err, token) => {
      //                 res.json({
      //                     success: true,
      //                     token: 'Bearer ' + token
      //                 });
      //             }
      //         );
      //     } else {
      //         return res
      //             .status(400)
      //             .json({ password: 'Password incorrect' });
      //     }
      // });
  });
});

router.get('/wakaride-riderreg-get', (req, res) => {
  ridesignup.find({}).then(user => {
        if (user) {
            return res.status(200).send(user);
            console.log(user, 'uesrezzzzzzz');
        }
    });
})
router.get("/eggroup-riderreg-get/:id", (req, res) => {
    const id = req.params.id;
    ridesignup.findById(id).then((resp) => {
      if (resp) {
        return res.status(200).send(resp);
      }
    });
  });
router.post('/eggroup-deleteinformation', (req, res) => {
    var id = req.body._id;
    ridesignup.deleteOne({
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
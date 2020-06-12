const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const async = require("async");
const nodemailer = require('nodemailer');
const multer = require('multer');
const doctorInfo = require('../../models/doctorInfo');
router.get('/test2', (req, res) => {
    res.json({
        statue: "success"
    });
});
// router.get('/doctors', (req, res) => {
//     res.json({
//         statue: "success"
//     });
// });
router.get('/doctor-info', (req, res) => {
    doctorInfo.find({}).then(user => {
        if (user) {
            return res.status(200).send(user);
            console.log(user, 'uesrezzzzzzz');
        }
    });
});


module.exports = router;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let doctors = new Schema({
    img:    "String",
    name:"String",
    first:  "String",
    last:   "String",
    role:   "String",
    address:    "String",
    gender: "String",
    profileLink:    "String",
    social: [{
        icon: "String",
        link: "String"
      }]
  
});

module.exports = mongoose.model('doctors', doctors, 'doctors');
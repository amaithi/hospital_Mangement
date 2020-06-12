const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let doctorInfo = new Schema({
    img:    "String",
    first:  "String",
    last:   "String",
    role:   "String",
    address:    "String",
    profileLink:    "String",
    social: [{
        icon: "String",
        link: "String"
      }]
  
});

module.exports = mongoose.model('doctorInfo', doctorInfo, 'doctorInfo');
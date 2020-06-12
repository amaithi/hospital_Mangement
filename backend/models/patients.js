const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let patients = new Schema({
    
    img:    "String",
    name:"String",
    id:  "String",
    age:   "String",
    address:    "String",
    gender: "String",
    number:    "String",
    lastVisit:    "String",
    status:    "String",
    profileLink:"String",
  
});

module.exports = mongoose.model('patients', patients, 'patients');
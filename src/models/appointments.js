const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let appointments = new Schema({
  
    img:    "String",
    name:"String",
    email:  "String",
    number:   "String",
    date:   "String",
    fromTo:    "String",
    doctor: "String",
    injury:    "String"
  
});

module.exports = mongoose.model('appointments', appointments, 'appointments');
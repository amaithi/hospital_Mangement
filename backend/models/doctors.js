const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let doctors = new Schema({
    img:   {
      type:"String",
      default:""
    },
    name:{
      type:"String",
      default:""
    },
    first:  {
      type:"String",
      default:""
    },
    lastName:   {
      type:"String",
      default:""
    },
    role:   {
      type:"String",
      default:""
    },
    address:    {
      type:"String",
      default:""
    },
    gender: {
      type:"String",
      default:""
    },
    doctorId:{
      type:"Number",
      default:""
    },
    label: {
      type:"String",
      default:""
    },

    profileLink:    {
      type:"String",
      default:""
    },
    social: [{
        icon: "String",
        link: "String"
      }]
  
});

module.exports = mongoose.model('doctors', doctors, 'doctors');
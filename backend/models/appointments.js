const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let appointments = new Schema({
  
    img:{
        type:"String",
        default:""
      },
    name:{
        type:"String",
        default:""
      },
    email: {
        type:"String",
        default:""
      },
    number:  {
        type:"String",
        default:""
      },
    date:   {
        type:"String",
        default:""
      },
    fromTo:    {
        type:"String",
        default:""
      },
    doctor: {
        type:"String",
        default:""
      },
    injury:   {
        type:"String",
        default:""
      },
    tokenno:{
        type:"String",
        default:""
      },
    doctorId:{
      type:"String",
      default:""
    },
    patientId:{
      type:"String",
      default:""
    },
    hospitalId:{
      type:"String",
      default:""
    },

});

module.exports = mongoose.model('appointments', appointments, 'appointments');
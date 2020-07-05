const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let doctorsspecialists = new Schema({
   
    name:{
      type:"String",
      default:""
    },
    label:{
        type:"String",
        default:""
    },
    value:{
        type:"String",
        default:""
    }
});

module.exports = mongoose.model('doctorsspecialists', doctorsspecialists, 'doctorsspecialists');
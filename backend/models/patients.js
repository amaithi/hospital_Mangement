const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let patients = new Schema({
    
  img:{
    type:"String",
    default:""
},
  name:   {
    type:"String",
    default:""
},
  id:   {
    type:"String",
    default:""
},
  age:   {
    type:"String",
    default:""
},
  address:   {
    type:"String",
    default:""
},
  gender:   {
    type:"String",
    default:""
},
  number:   {
    type:"String",
    default:""
},
  lastVisit:   {
    type:"String",
    default:""
},
  status:   {
    type:"String",
    default:""
},
  profileLink:   {
    type:"String",
    default:""
},
lastVisit:  {
    type:"String",
    default:new Date()
},
label:{
  type:"String",
}

});

module.exports = mongoose.model('patients', patients, 'patients');
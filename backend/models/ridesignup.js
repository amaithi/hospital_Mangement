const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ridesignup = new Schema({
  username: {
    type: String
  },
  email  : {
    type: String
  },
  password  : {
    type: String
  },
  cpassword  : {
    type: String
  },
  role : {
    type: String
  }
    
});

module.exports = mongoose.model('ridesignup', ridesignup, 'ridesignup');
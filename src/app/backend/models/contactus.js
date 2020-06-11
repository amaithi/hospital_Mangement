const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let contactus = new Schema({
  name: {
    type: String
  },
  email  : {
    type: String
  },
  subject  : {
    type: String
  },
  message  : {
    type: String
  }
    
});

module.exports = mongoose.model('contactus', contactus, 'contactus');
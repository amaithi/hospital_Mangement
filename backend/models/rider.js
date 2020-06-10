const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let rider = new Schema({
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

module.exports = mongoose.model('rider', rider, 'rider');
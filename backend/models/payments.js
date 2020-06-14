const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let payments = new Schema({
    
    billNo: String,
    billDate: String,
    patient: String,
    doctor: String,
    charges: String,
    tax: String,
    discount: String,
    total: String,
  
});

module.exports = mongoose.model('payments', payments, 'payments');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let payments = new Schema({
    
    billNo:  {
        type:"String",
        default:""
      },
    billDate:  {
        type:"String",
        default:""
      },
    patient:  {
        type:"String",
        default:""
      },
    doctor:  {
        type:"String",
        default:""
      },
    charges:  {
        type:"String",
        default:""
      },
    tax:  {
        type:"String",
        default:""
      },
    discount:  {
        type:"String",
        default:""
      },
    total:  {
        type:"String",
        default:""
      },
    patientId:  {
        type:"String",
        default:""
      },
    doctorId:  {
        type:"String",
        default:""
      },
    hospitalId:  {
        type:"String",
        default:""
      },
  
});

module.exports = mongoose.model('payments', payments, 'payments');
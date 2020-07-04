const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    // required: true
  },
  subject: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  Address: {
    type: String,
    default: "",
  },
  username:{
    type: String,
    default: "",
  },
  
  userid: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  ownername:{
    type: String,
    required: true,
  },
  number: {
    type: String,
    default: "",
  },
  address1: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  alternumber:{
    type: String,
    default: "",
  },
  google: {
    type: String,
    default: "Disabled",
  },
  googlesecretcode: {
    type: String,
  },
  country: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  pincode: {
    type: String,
    default: "",
  },
  otp: {
    type: String,
    default: "",
  },
  otptime: {
    type: Date,
    default: "",
  },
  otpstatus: {
    type: String,
    default: "Not Verified",
  },
  role: {
    type: String,
    default: "user",
  },
  active: {
    type: String,
    default: "Not Activated",
  },
  status: {
    type: String,
    default: 1, //1-Completed
  },
  IDtype: {
    type: String,
    default: "",
  },
  IDproofno: {
    type: String,
    default: "",
  },
  IDprooffront: {
    type: String,
  },
  IDproofback: {
    type: String,
  },
  
  Addressproofno: {
    type: String,
    default: "",
  },
  Addressfile: {
    type: String,
  },
  Phototype: {
    type: String,
    default: "",
  },
  Phototypeno: {
    type: String,
    default: "",
  },
  Photofile: {
    type: String,
  },
  IDstatus: {
    type: String,
    default: "Not verified",
  }, //0-Unverified, 1-Verified, 2->pending, 3->Rejected
  Addresstatus: {
    type: String,
    default: "Not verified",
  }, //0-Unverified, 1-Verified, 2->pending, 3->Rejected
  Photostatus: {
    type: String,
    default: "Not verified",
  }, //0-Unverified, 1-Verified, 2->pending, 3->Rejected[]
  verifiedstatus: {
    type: String,
    default: "Not verified", //0-Unverified, 1-Verified, 2 -pending
  },
  kycdate: {
    type: Date,
  },
  role:{
    type: String,
  },
  referaluserid: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  referaluseremail: {
    type: String,
  },
  referencecode: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  loginhistory: [
    {
      countryCode: {
        type: String,
        default: "",
      },
      countryName: {
        type: String,
        default: "",
      },
      regionName: {
        type: String,
        default: "",
      },
      ipaddress: {
        type: String,
        default: "",
      },
      browsername: {
        type: String,
        default: "",
      },
      ismobile: {
        type: String,
        default: "",
      },
      os: {
        type: String,
        default: "",
      },
      status: {
        type: String,
        default: "Success", // success / failure
      },
      logindate: {
        type: String,
      },
    },
  ],
});

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});

module.exports = ridesignup = mongoose.model("ridesignup", UserSchema);
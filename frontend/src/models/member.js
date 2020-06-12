const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Member = new Schema({
	  first: {
    	type: String
  	},
    last: {
    	type: String
  	},
    mobile: {
    	type: String
  	},
    email: {
    	type: String
  	},
    dob: {
    	type: String
  	},
    city: {
    	type: String
  	},
    postalcode: {
    	type: String
  	},
    drivinglice: {
    	type: String
  	},
    vehicleIns: {
    	type: String
  	},
    inscompany: {
    	type: String
  	},
    vehiclemake: {
    	type: String
  	},
    vehicleyear: {
    	type: String
  	},
    vehiclecolor: {
    	type: String
  	},
    vehiclemodel: {
    	type: String
  	},
    vehiclekm: {
    	type: String
  	},
    vehicleplateno: {
    	type: String
  	},
    acnumber: {
    	type: String
  	},
    bankname: {
    	type: String
  	},
    branchname: {
    	type: String
  	},
	nameonbank: {
    	type: String
  	},
    language:{
      	type: String
	},
	drivingLicePic:{
		type: String
	},
	carrego:{
		type: String
	},
	cof:{
		type: String
	},
	insurancepaper:{
		type: String
	},
	psl:{
		type: String
	},
	destination:{
		type: String
	}
    
});

module.exports = mongoose.model('Member', Member, 'Member');
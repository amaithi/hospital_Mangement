const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateMemberInput(data) {
    let errors = {};
    console.log(data.psl)
    data.first = !isEmpty(data.first) ? data.first : "";
    data.last = !isEmpty(data.last) ? data.last : "";
    data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.dob = !isEmpty(data.dob) ? data.dob : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.postalcode = !isEmpty(data.postalcode) ? data.postalcode : "";
    data.drivinglice = !isEmpty(data.drivinglice) ? data.drivinglice : "";
    data.vehicleIns = !isEmpty(data.vehicleIns) ? data.vehicleIns : "";
    data.inscompany = !isEmpty(data.inscompany) ? data.inscompany : "";
    data.vehiclemake = !isEmpty(data.vehiclemake) ? data.vehiclemake : "";
    data.vehicleyear = !isEmpty(data.vehicleyear) ? data.vehicleyear : "";
    data.vehiclecolor = !isEmpty(data.vehiclecolor) ? data.vehiclecolor : "";
    data.vehiclemodel = !isEmpty(data.vehiclemodel) ? data.vehiclemodel : "";
    data.vehiclekm = !isEmpty(data.vehiclekm) ? data.vehiclekm : "";
    data.vehicleplateno = !isEmpty(data.vehicleplateno) ? data.vehicleplateno : "";
    data.acnumber = !isEmpty(data.acnumber) ? data.acnumber : "";
    // data.bankname = !isEmpty(data.bankname) ? data.bankname : "";
    data.branchname = !isEmpty(data.branchname) ? data.branchname : "";
    data.bankname = !isEmpty(data.bankname) ? data.bankname : "";
    data.nameonbank = !isEmpty(data.nameonbank) ? data.nameonbank : "";
    data.drivingLicePic = !isEmpty(data.drivingLicePic) ? data.drivingLicePic : "";
    data.psl = !isEmpty(data.psl) ? data.psl : "";
    data.insurancepaper = !isEmpty(data.insurancepaper) ? data.insurancepaper : "";
    data.carrego = !isEmpty(data.carrego) ? data.carrego : "";
    data.cof = !isEmpty(data.cof) ? data.cof : "";
    data.language = !isEmpty(data.language) ? data.language : "";
     data.agree = data.agree ? data.agree : "";
    console.log(data.agree)
    if (Validator.isEmpty(data.psl)) {
        errors.psl = "PSL OR P Licence Number Photo field is required";
    }
    if (data.agree == 'false') {
        errors.agree = "Please check the agree box";
    }
    if (Validator.isEmpty(data.insurancepaper)) {
        errors.insurancepaper = "Insurance Paper Photo field is required";
    }
    if (Validator.isEmpty(data.carrego)) {
        errors.carrego = "Car Rego Photo field is required";
    }
    if (Validator.isEmpty(data.cof)) {
        errors.cof = "COF Expiry Date Photo field is required";
    }
    // data.language = !isEmpty(data.language)? data.language : "";
    if (Validator.isEmpty(data.first)) {
        errors.first = "First Name field is required";
    }
    if (Validator.isEmpty(data.last)) {
        errors.last = "Last Name field is required";
    }
    if (Validator.isEmpty(data.mobile)) {
        errors.mobile = "Mobile Number is required";
    }else if(!Number(data.mobile)){
        errors.mobile = "Field only allow Number";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }else if (!Validator.isEmail(data.email)) {
        errors.email = "Valid Email field is required";
    }
    if (Validator.isEmpty(data.dob)) {
        errors.dob = "Date of Birth field is required";
    }
    if (Validator.isEmpty(data.city)) {
        errors.city = "City Name field is required";
    }
    if (Validator.isEmpty(data.postalcode)) {
        errors.postalcode = "Postal Code field is required";
    }
    if (Validator.isEmpty(data.inscompany)) {
        errors.inscompany = "Insurance Company field is required";
    }
     if (Validator.isEmpty(data.drivinglice)) {
        errors.drivinglice = "Driving Licence field is required";
    }
    if (Validator.isEmpty(data.vehicleIns)) {
        errors.vehicleIns = "Vehicle Insurance Number field is required";
    }
    if (Validator.isEmpty(data.vehiclemake)) {
        errors.vehiclemake = "Vehicle Make Name field is required";
    }
    if (Validator.isEmpty(data.vehicleyear)) {
        errors.vehicleyear = "Vehicle Year field is required";
    }
    if (Validator.isEmpty(data.vehiclecolor)) {
        errors.vehiclecolor = "Vehicle Color field is required";
    }
    if (Validator.isEmpty(data.vehiclemodel)) {
        errors.vehiclemodel = "Vehicle Model field is required";
    }
    if (Validator.isEmpty(data.vehiclekm)) {
        errors.vehiclekm = "Vehicle Kilometers field is required";
    }
    if (Validator.isEmpty(data.acnumber)) {
        errors.acnumber = "Bank Account Number field is required";
    }
    if (Validator.isEmpty(data.bankname)) {
        errors.bankname = "Bank Name field is required";
    }
    if (Validator.isEmpty(data.branchname)) {
        errors.branchname = "Branch of Bank field is required";
    }
    if (Validator.isEmpty(data.nameonbank)) {
        errors.nameonbank = "Name on Bank Account field is required";
    }
    if (Validator.isEmpty(data.vehicleplateno)) {
        errors.vehicleplateno = "Vehicle Number Plate field is required";
    }
    if (Validator.isEmpty(data.drivingLicePic)) {
        errors.drivingLicePic = "Driving License (Photo Both Sides) field is required";
    }
    if (data.language =='') {
        errors.language = "Language field is required";
    }
    console.log(errors)
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

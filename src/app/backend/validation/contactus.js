const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateContactInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.message = !isEmpty(data.message) ? data.message : "";
    data.subject = !isEmpty(data.subject) ? data.subject : "";
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }else if (!Validator.isEmail(data.email)) {
        errors.email = "Valid Email field is required";
    }
    if (Validator.isEmpty(data.message)) {
        errors.message = "Message field is required";
    }
    if (Validator.isEmpty(data.subject)) {
        errors.subject = "Subject field is required";
    }
    if(data.cpassword != data.password){
        errors.cpassword ="Confirm password not matched with password";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

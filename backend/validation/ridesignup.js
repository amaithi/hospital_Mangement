const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRiderSignupInput(data) {
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // data.cpassword = !isEmpty(data.cpassword) ? data.cpassword : "";
    if (Validator.isEmpty(data.username)) {
        errors.username = " Name field is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }else if (!Validator.isEmail(data.email)) {
        errors.email = "Valid Email field is required";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    // if (Validator.isEmpty(data.cpassword)) {
    //     errors.cpassword = "Confirm Password field is required";
    // }
    // if(data.cpassword != data.password){
    //     errors.cpassword ="Confirm password not matched with password";
    // }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

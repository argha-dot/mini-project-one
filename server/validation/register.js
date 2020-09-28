const is_empty = require('is-empty');
const validator = require('validator');

function validateRegister(data) {
    let error_list = {};

    if (is_empty(data.name) || !validator.isAlpha(data.name)) {
        error_list.name = "Name is invalid!"
    }

    if (is_empty(data.email) || !validator.isEmail(data.email)) {
        error_list.name = "Email is invalid!"
    }

    if (is_empty(data.password) || !validator.isLength(data.password, {min: 6, max: 30})) {
        error_list.password = "Password should be of length 6 or more!"
    }

    if(is_empty(data.conifrm_password) || !validator.equals(data.password, data.conifrm_password)) {
        error_list.conifrm_password = "Passwords should match!"
    }

    return {
        error_list, 
        isValid: is_empty(error_list)
    };
}

module.exports = {validateRegister};
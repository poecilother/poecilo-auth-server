const validator = require('validator');
const { userValidation } = require('./userMessages');

const constraints = {
  password: {
    minLength: 8,
    maxLength: 256,
  }
};

module.exports = {
  email: (email, response) => {
    if (Object.is(email, undefined) || Object.is(email, null)) {
      response.fields.push('email');
      response.msgs.push(userValidation.email.missing);
    } else if (typeof email !== 'string' && !(email instanceof String)) {
      response.fields.push('email');
      response.msgs.push(userValidation.email.type);
    } else if (validator.isEmpty(email)) {
      response.fields.push('email');
      response.msgs.push(userValidation.email.missing);
    } else if (!validator.isEmail(email)) {
      response.fields.push('email');
      response.msgs.push(userValidation.email.invalid);
    }
    return response;
  },
  password: (password, response) => {
    if (Object.is(password, undefined) || Object.is(password, null)) {
      response.fields.push('password');
      response.msgs.push(userValidation.password.missing);
    } else if (typeof password !== 'string' && !(password instanceof String)) {
      response.fields.push('password');
      response.msgs.push(userValidation.password.type);
    } else if (validator.isEmpty(password)) {
      response.fields.push('password');
      response.msgs.push(userValidation.password.missing);
    } else {
      const passwordValidationMsgs = {};

      if (password.length < constraints.password.minLength) {
        passwordValidationMsgs.minLength = userValidation.password.minLength(constraints.password.minLength);
      }
      if (password.length > constraints.password.maxLength) {
        passwordValidationMsgs.maxLength = userValidation.password.maxLength(constraints.password.maxLength);
      }
      if (!/\d/.test(password)) {
        passwordValidationMsgs.digit = userValidation.password.digit;
      }
      if (!/[A-Z]/.test(password)) {
        passwordValidationMsgs.capital =userValidation.password.capital;
      }
      if (!/[a-z]/.test(password)) {
        passwordValidationMsgs.small = userValidation.password.small;
      }
      if (!/(?=\S)\W/.test(password)) {
        passwordValidationMsgs.special = userValidation.password.special;
      }
      if (/\s/.test(password)) {
        passwordValidationMsgs.whiteSpace = userValidation.password.whiteSpace;
      }

      if (Object.keys(passwordValidationMsgs).length > 0) {
        response.fields.push('password');
        response.msgs.push(passwordValidationMsgs);
      }
    }
    return response;
  }
};

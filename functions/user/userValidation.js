const validator = require('validator');

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
      response.msgs.push('Email is missing.');
    } else if (typeof email !== 'string' && !(email instanceof String)) {
      response.fields.push('email');
      response.msgs.push('Email must be a string.');
    } else if (validator.isEmpty(email)) {
      response.fields.push('email');
      response.msgs.push('Email is missing');
    } else if (!validator.isEmail(email)) {
      response.fields.push('email');
      response.msgs.push('Invalid email');
    }
    return response;
  },
  password: (password, response) => {
    if (Object.is(password, undefined) || Object.is(password, null)) {
      response.fields.push('password');
      response.msgs.push('Password is missing.');
    } else if (typeof password !== 'string' && !(password instanceof String)) {
      response.fields.push('password');
      response.msgs.push('Password must be a string.');
    } else if (validator.isEmpty(password)) {
      response.fields.push('password');
      response.msgs.push('Password is missing');
    } else {
      const passwordValidationMsgs = {};

      if (password.length < constraints.password.minLength) {
        passwordValidationMsgs.minLength = `Password must have at least ${ constraints.password.minLength } characters.`;
      }
      if (password.length > constraints.password.maxLength) {
        passwordValidationMsgs.maxLength = `Password must have at least ${ constraints.password.maxLength } characters.`;
      }
      if (!/\d/.test(password)) {
        passwordValidationMsgs.digit = 'Password must have at least one digit';
      }
      if (!/[A-Z]/.test(password)) {
        passwordValidationMsgs.capital ='Password must have at least one capital letter';
      }
      if (!/[a-z]/.test(password)) {
        passwordValidationMsgs.small = 'Password must have at least one small letter';
      }
      if (!/(?=\S)\W/.test(password)) {
        passwordValidationMsgs.special = 'Password must have at least one special character';
      }
      if (/\s/.test(password)) {
        passwordValidationMsgs.whiteSpace = "Password can't have any white space";
      }

      if (Object.keys(passwordValidationMsgs).length > 0) {
        response.fields.push('password');
        response.msgs.push(passwordValidationMsgs);
      }
    }
    return response;
  }
};

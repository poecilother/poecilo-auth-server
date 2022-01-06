module.exports = {
  service: {

  },

  validation: {
    email: {
      missing: 'Email is missing.',
      invalid: 'Invalid email.',
      type: 'Email must be a string.',
    },
    password: {
      missing: 'Password is missing.',
      type: 'Password must be a string.',
      minLength: (length) => { return `Password must have at least ${ length } characters.` },
      maxLength: (length) => { return `Password can have maximum ${ length } characters.` },
      digit: 'Password must have at least one digit',
      capital: 'Password must have at least one capital letter',
      small: 'Password must have at least one small letter',
      special: 'Password must have at least one special character',
      whiteSpace: "Password can't have any white space",
    }
  }
};
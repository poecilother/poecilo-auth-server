module.exports = {
  validation: {
    body: {
      missing: 'Body is missing.',
    },
    object: {
      missing: (objectName) => { return `Object ${ objectName } is missing.` },
      invalid: (objectName) => { return `Invalid ${ objectName } object.` },
    },
  },
};

const _ = require('lodash');

function checkObjectsKeys(object, arrayOfKeys) {
  if(!_.isEqual(Object.keys(object).sort(), arrayOfKeys.sort())) return 0;
  return 1;
};

module.exports = checkObjectsKeys;

function checkIfObjectExist(objectToCheck) {
  if (Object.is(objectToCheck, undefined) || Object.is(objectToCheck, null)) return 0;
  if (typeof objectToCheck !== 'object') return 0;
  return 1;
};

module.exports = checkIfObjectExist;

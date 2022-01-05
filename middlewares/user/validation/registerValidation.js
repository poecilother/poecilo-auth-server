const checkRequestBody = require('../../../functions/checkRequestBody');
const checkIfObjectExist = require('../../../functions/checkIfObjectExist');
const checkObjectsKeys = require('../../../functions/checkObjectsKeys');
const userValidation = require('../../../functions/user/userValidation');
const { responseStatus } = require('../../../functions/restUtils');

function registerValidation(req, res, next) {
  const userObjectKeys = ['email', 'password'];
  let response = { fields: [], msgs: [] };
  
  if (!checkRequestBody(req)) return res.status(responseStatus.BAD_REQUEST().status).send('Body is missing.');
  if (!checkIfObjectExist(req.body.user)) return res.status(responseStatus.BAD_REQUEST().status).send('Object user is missing.');
  if (!checkObjectsKeys(req.body.user, userObjectKeys)) return res.status(responseStatus.BAD_REQUEST().status).send('Invalid user object.');
  
  response = userValidation.email(req.body.user.email, response);
  response = userValidation.password(req.body.user.password, response);

  if (response.fields.length > 0) return res.status(responseStatus.BAD_REQUEST().status).send(response);
  next();
};

module.exports = registerValidation;

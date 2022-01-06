const checkRequestBody = require('../../../utils/common/checkRequestBody');
const checkIfObjectExist = require('../../../utils/common/checkIfObjectExist');
const checkObjectsKeys = require('../../../utils/common/checkObjectsKeys');
const { responseStatus } = require('../../../utils/common/restUtils');
const userValidation = require('../../../utils/user/userValidation');
const { commonValidation } = require('../../../utils/common/commonMessages');

function registerValidation(req, res, next) {
  const userObjectKeys = ['email', 'password'];
  let response = { fields: [], msgs: [] };
  
  if (!checkRequestBody(req)) 
    return res.status(responseStatus.BAD_REQUEST().status).send(commonValidation.body.missing);
  if (!checkIfObjectExist(req.body.user))
    return res.status(responseStatus.BAD_REQUEST().status).send(commonValidation.object.missing('user'));
  if (!checkObjectsKeys(req.body.user, userObjectKeys))
    return res.status(responseStatus.BAD_REQUEST().status).send(commonValidation.object.invalid('user'));
  
  response = userValidation.email(req.body.user.email, response);
  response = userValidation.password(req.body.user.password, response);

  if (response.fields.length > 0) return res.status(responseStatus.BAD_REQUEST().status).send(response);
  next();
};

module.exports = registerValidation;

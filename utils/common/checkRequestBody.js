function checkRequestBody(req) {
  if (req.body === undefined) return 0;
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) return 0;
  return 1;
};

module.exports = checkRequestBody;

const UserService = require('../../services/UserService');

async function register(req, res) {
  const response = await UserService.register(req.body.user);
  console.log(response)
  return res.status(response.status).send(response.message);
};

module.exports = register;

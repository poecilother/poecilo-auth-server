const UserService = require('../../services/UserService');

async function register(req, res) {
  const response = await UserService.register(req.body.user);
  return res.status(response.status).json(response.message);
};

module.exports = register;

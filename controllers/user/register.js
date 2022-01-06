const UserService = require('../../services/UserService');

async function register(req, res) {
  const { user } = req.body;
  const response = await UserService.register(user);
  return res.status(response.status).json(response.message);
};

module.exports = register;

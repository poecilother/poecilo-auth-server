const { models } = require('../configs/sequelize');
const { responseStatus } = require('../utils/common/restUtils');
const TokenService = require('./TokenService');

function UserService() {

  this.register = async function(user) {
    try {
      const isEmailExist = await models.User.findOne({ where: { email: user.email } });
      if (isEmailExist) return responseStatus.CONFLICT('This email is already in use.');
    } catch (err) {
      console.error('Sequelize isEmailExist User.findOne ERROR in UserService.register method: ', err);
      return responseStatus.INTERNAL_SERVER('Something went wrong. Try again later.');
    }

    try {
      const isUserCreated = await models.User.create(user);
      if (!isUserCreated) return responseStatus.INTERNAL_SERVER('Failed to create user.');
    } catch (err) {
      console.error('Sequelize isUserCreated User.create ERROR in UserService.register method: ', err);
      return responseStatus.INTERNAL_SERVER('Something went wrong. Try again later.');
    }

    return responseStatus.OK('Registered');
  };

  this.login = function(user) {

  };
};

module.exports = new UserService();

const { models } = require('../configs/sequelize');
const jwt = require('jsonwebtoken');

function TokenService() {

  this.getAccessToken = function(userId, accountStatus) {
    return jwt.sign({
      userId,
      accountStatus
    }, process.env.SECRET, { expiresIn: process.env.ACCESS_EXP_TIME } );
  };
};

module.exports = new TokenService();

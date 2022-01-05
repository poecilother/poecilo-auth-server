const { DataTypes } = require("sequelize");
const argon2 = require('argon2');

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      lastLogin: {
        type: DataTypes.DATE,
        defaultValue: new Date(null)
      },
      lastLogout: {
        type: DataTypes.DATE,
        defaultValue: new Date(null)
      },
    },
    { tableName: "user" }
  );
  
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword;
  });

  User.prototype.verifyPassword = async function (password) {
    if (!await argon2.verify(this.password, password)) return 0;
    return 1;
  };
};

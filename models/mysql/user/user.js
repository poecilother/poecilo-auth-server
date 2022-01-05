const { DataTypes } = require("sequelize");

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
  
  User.prototype.verifyPassword = function (password) {
    
  };
};

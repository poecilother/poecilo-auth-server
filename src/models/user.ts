import { DataTypes, Model, Sequelize } from 'sequelize';
import * as argon2 from 'argon2';

class User extends Model {
  verifyPassword: (password: string) => Promise<boolean>;
};

export function UserModel(sequelize: Sequelize) {
  User.init({
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
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',
    }
  );

  User.beforeCreate(async function () {
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
  });

  User.prototype.verifyPassword = async function (password) {
    if (!await argon2.verify(this.password, password)) return false;
    return true;
  };
};

import { Dialect, Sequelize } from 'sequelize';
import { UserModel } from './user';

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: process.env.DB_DIALECT as Dialect || 'mysql',
  logging: false
});

UserModel(sequelize);

export const User = sequelize.models.User;

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connection to ${ process.env.DB } has been established successfully.`);
    await sequelize.sync();
  } catch (err) {
    console.error('Sequelize connection ERROR: ', err);
  }
};
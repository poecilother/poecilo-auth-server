import { User } from '../models';
import { responseMessage } from '../utils/rest-utils';

export const UserService = {
  async getUserByEmail(email: string) {
    try {
      return await User.findOne({ where: { email } });
    } catch (err) {
      console.error('Sequelize ERROR in UserService getUserByEmail() User.findOne(): ', err);
      throw responseMessage.error;
    }
  },

  async registerUser(user: object) {
    try {
      return await User.create(user);
    } catch (err) {
      console.error('Sequelize ERROR in UserService registerUser() User.create(): ', err);
      throw responseMessage.error;
    }
  },
};

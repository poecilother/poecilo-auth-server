import { responseMessage } from '../utils/rest-utils';
import jwt from 'jsonwebtoken';

export const TokenService = {
  getAccessToken: (userId: number, accountStatus: number) => {
    return jwt.sign({
      userId,
      accountStatus
    }, process.env.SECRET, { expiresIn: process.env.ACCESS_EXP_TIME } );
  },
};
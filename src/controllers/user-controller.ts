import { Request, Response } from 'express';
import { UserService } from '../services';
import { responseStatus, responseMessage } from '../utils/rest-utils';

export const UserController = {
  async registerUser(req: Request, res: Response) {
    try {
      const { user } = req.body;
      const registeredUser = await UserService.registerUser(user);
      return res.status(responseStatus.CREATED).send(registeredUser);
    } catch (err) {
      return res.status(responseStatus.INTERNAL_SERVER).send(err);
    }
  },
};

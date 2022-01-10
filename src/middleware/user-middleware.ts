import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services';
import { responseStatus, responseMessage } from '../utils/rest-utils';
import { UserValidation, GeneralValidation } from '../utils/validation';

export const UserMiddleware = {
  async registerValidation(req: Request, res: Response, next: NextFunction) {
    const userFields = ['email', 'password'];
    const invalidFields = [];
    let validateHelper;

    if (GeneralValidation.isRequestBodyMissing(req))
      return res.status(responseStatus.BAD_REQUEST).send(responseMessage.missingParam('body'));
    if (GeneralValidation.checkObjectKeys(req.body.user, userFields))
      return res.status(responseStatus.BAD_REQUEST).send(responseMessage.invalid('user object', 'fields'));
    
    validateHelper = UserValidation.email(req.body.user.email);
    if (validateHelper) invalidFields.push({ field: 'email', message: validateHelper });

    validateHelper = UserValidation.password(req.body.user.password);
    if (validateHelper) invalidFields.push({ field: 'password', message: validateHelper });

    if (invalidFields.length) return res.status(responseStatus.BAD_REQUEST).send(invalidFields);

    try {
      if (await UserService.getUserByEmail(req.body.user.email)) {
        return res.status(responseStatus.BAD_REQUEST).send(responseMessage.valueAlreadyInUse('email'));
      }
    } catch (err) {
      return res.status(responseStatus.INTERNAL_SERVER).send(err);
    }

    next();
  },
};

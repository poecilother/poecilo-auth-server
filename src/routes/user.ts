import { Router } from 'express';
const router = Router();

import { UserController } from '../controllers';
import { UserMiddleware } from '../middleware';

router.post('/register', UserMiddleware.registerValidation, UserController.registerUser);

export default router;

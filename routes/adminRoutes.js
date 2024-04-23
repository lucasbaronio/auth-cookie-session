import express from 'express';

import { signUpAdmin } from '../controllers/authController.js';
import { ROLE_TYPES } from '../models/userModel.js';
import tokenMiddleware from '../middlewares/tokenMiddleware.js';
import { restrictTo } from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.route('/signup').post(tokenMiddleware, restrictTo(ROLE_TYPES.ADMIN), signUpAdmin);
// If this is the first time, you must create admin without above validations middlewares
// router.route('/signup').post(signUpAdmin);

export default router;

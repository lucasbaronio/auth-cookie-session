import express from 'express';

import {
  signUp,
  signIn,
  signOut,
} from '../controllers/authController.js';
import tokenMiddleware from '../middlewares/tokenMiddleware.js';
import { getCurrentUser, getUsers } from '../controllers/userController.js';

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/signout').delete(tokenMiddleware, signOut);
router.route('/').get(tokenMiddleware, getUsers);
router.route('/me').get(tokenMiddleware, getCurrentUser);

export default router;

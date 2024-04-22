/* eslint-disable no-undef */
import cookieSession from 'cookie-session';
import { isProduction } from '../utils/environment.js';

const devCookieConfig = {
  httpOnly: false,
  maxAge: 5400000,
};

const prodCookieConfig = {
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 5400000,
};

export const extendSessionExpiration = (req, res, next) => {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
  next();
};

const sessionMiddleware = () => {
  const cookieConfig = isProduction() ? prodCookieConfig : devCookieConfig;
  return cookieSession({
    name: 'session',
    secret: process.env.JWT_SECRET,
    ...cookieConfig,
  });
};

export default sessionMiddleware;

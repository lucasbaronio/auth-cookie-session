/* eslint-disable no-undef */
import cookieSession from 'cookie-session';
import { isProduction } from '../utils/environment.js';

const devCookieConfig = {
  httpOnly: false,
  maxAge: process.env.COOKIE_SESSION_EXPIRES_IN,
};

const prodCookieConfig = {
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: process.env.COOKIE_SESSION_EXPIRES_IN,
};

export const extendSessionExpiration = (req, res, next) => {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
  next();
};

const sessionMiddleware = () => {
  const cookieConfig = isProduction() ? prodCookieConfig : devCookieConfig;
  return cookieSession({
    name: 'session',
    secret: process.env.COOKIE_SESSION_SECRET,
    ...cookieConfig,
  });
};

export default sessionMiddleware;

/* eslint-disable no-undef */
import util from 'util';
import jwt from 'jsonwebtoken';
import SessionManager from '../utils/SessionManager.js';

export const generateJwtToken = (id, data) =>
  jwt.sign({ id, data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const tokenMiddleware = async (req, res, next) => {
  const jwtToken = SessionManager.getToken(req);
  if (!jwtToken) return res.status(400).json({ message: 'You are not logged' });

  let decodedToken;
  try {
    decodedToken = await util.promisify(jwt.verify)(jwtToken, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(400).json({ message: 'Token expired!', stack: error });
  }
  req.user = decodedToken?.data;
  next();
};

export default tokenMiddleware;

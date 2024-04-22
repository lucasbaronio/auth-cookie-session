import devError from '../utils/devError.js';
import prodError from '../utils/prodError.js';
import {
  handleCastErrorDB,
  handleValidationErrorDB,
  handleInvalidJwtToken,
  handleExpiredJwtToken,
} from '../utils/errorHandlers.js';
import { isDevelopment, isProduction } from '../utils/environment.js';

export default (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'CastError') {
    err = handleCastErrorDB(err);
  }

  if (err.name === 'ValidationError') {
    err = handleValidationErrorDB(err);
  }

  if (err.name === 'JsonWebTokenError') {
    err = handleInvalidJwtToken(err);
  }

  if (err.name === 'TokenExpiredError') {
    err = handleExpiredJwtToken(err);
  }

  if (isDevelopment()) return devError(err, res);

  if (isProduction()) return prodError(err, res);
};

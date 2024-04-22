const globalError = (err) => {
  err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';
  err.isOperational = true;
  return err;
};

export const handleCastErrorDB = (err) => {
  err.message = `${err.path} is not valid! Please verify the value: ${err.value}, and try again.`;
  err.statusCode = 400;

  return globalError(err);
};

export const handleValidationErrorDB = (err) => {
  const message = Object.values(err.errors).map((e) => e.message);
  err.message = `${message.join('. ')}`;
  err.statusCode = 400;

  return globalError(err);
};

export const handleInvalidJwtToken = (err) => {
  err.message = 'The verification token is invalid! Please Login again.';
  err.statusCode = 401;

  return globalError(err);
};

export const handleExpiredJwtToken = (err) => {
  err.message = 'Your verification token has expired! Please Login again.';
  err.statusCode = 401;

  return globalError(err);
};

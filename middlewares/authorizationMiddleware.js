import catchAsyncError from "../utils/catchAsyncError.js";
import GlobalError from "../utils/globalError.js";
import SessionManager from "../utils/SessionManager.js";

export const restrictTo = (...roles) => catchAsyncError(async (req, res, next) => {
  const currentUser = SessionManager.getUser(req);
  if (!roles.includes(currentUser?.role))
    return next(new GlobalError(403, 'You do not have enough permissions to view this section'));

  next();
});

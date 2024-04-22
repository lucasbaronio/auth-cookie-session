import { generateJwtToken } from "../middlewares/tokenMiddleware.js";
import User from "../models/userModel.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import GlobalError from "../utils/globalError.js";
import SessionManager from "../utils/sessionManager.js";

export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new GlobalError(400, 'Please provide a correct data!'));
  
    const currentUser = await User.findOne({ email }).select('+password');

    if (!currentUser || !(await currentUser.checkPassword(password, currentUser.password)))
        return next(new GlobalError(400, 'The email or password is not correct'));

    const jwtToken = generateJwtToken(currentUser._id);

    SessionManager.setToken(req, jwtToken);
    SessionManager.setUser(req, currentUser);

    const loggedUser = {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
    };
  
    return res.status(200).json({ ...loggedUser });
});
  
export const signOut = catchAsyncError((req, res) => {
    req.session = null;
    return res.status(200).json({ message: 'Logged out!' });
});

export const signUp = catchAsyncError(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        confirmPassword,
      });

    const jwtToken = generateJwtToken(newUser._id);

    SessionManager.setToken(req, jwtToken);
    SessionManager.setUser(req, newUser);

    const loggedUser = {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
      };

    return res.status(201).json({ ...loggedUser });
});

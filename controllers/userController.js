import User from "../models/userModel.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import SessionManager from "../utils/SessionManager.js";

export const getUsers = catchAsyncError(async (req, res) => {
    const users = await User.find();
  
    res.status(200).json(users);
});

export const getUserById = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.params.id);

    const UserFilter = {
      name: user.name,
      email: user.email,
      id: user._id,
    };
  
    res.status(200).json(UserFilter);
});

export const getCurrentUser = catchAsyncError((req, res) => {
    const currentUser = SessionManager.getUser(req);
    const currentUserFilter = {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
    };
    return res.status(200).json(currentUserFilter);
});

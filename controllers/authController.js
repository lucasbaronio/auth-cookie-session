import { generateJwtToken } from "../middlewares/tokenMiddleware.js";
import SessionManager from "../utils/sessionManager.js";
import { createUser, getUser } from "./userController.js";

export const signIn = (req, res) => {
    const { username, password } = req.body;
    console.log(password);
  
    const user = getUser(username);
    if (!user) return res.status(400).json({ message: "Username or Password are not correct" });
    const jwtToken = generateJwtToken(user.id);

    SessionManager.setToken(req, jwtToken);
    SessionManager.setUser(req, user);
  
    return res.status(200).json({ ...user });
};
  
export const signOut = (req, res) => {
    req.session = null;
    return res.status(200).json({ message: 'Logged out!' });
};

export const signUp = (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords are not equals' });
    
    const newUser = createUser({ username, email, password, confirmPassword });
    const jwtToken = generateJwtToken(newUser.id);

    SessionManager.setToken(req, jwtToken);
    SessionManager.setUser(req, newUser);

    return res.status(200).json({ ...newUser });
};

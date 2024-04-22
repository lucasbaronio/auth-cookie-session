import SessionManager from "../utils/sessionManager.js";

let ID = 2;

let users = [
    {
        id: 1,
        username: 'lbaronio',
        password: 'pepepepe',
    },
    {
        id: 2,
        username: 'ppequez',
        password: 'pepepepe',
      },
];

export const getUsers = (req, res) => {
    return res.status(200).json(users);
}

export const getCurrentUser = (req, res) => {
    const currentUser = SessionManager.getUser(req);
    return res.status(200).json(currentUser);
}

export const createUser = (newUser) => {
    ID = ID + 1;
    const user = { ...newUser, id: ID }
    users.push(user);
    return user;
}

export const getUser = (userName) => {
    return users.find((user) => user.username === userName);
}

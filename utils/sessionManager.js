const USER = 'user';
const TOKEN = 'token';

class SessionManager {
  getUser(req) {
    return req.session[USER];
  }

  setUser(req, user) {
    req.session[USER] = user;
  }

  getToken(req) {
    return req.session.token;
  }

  setToken(req, token) {
    req.session[TOKEN] = token;
  }
}

export default new SessionManager();

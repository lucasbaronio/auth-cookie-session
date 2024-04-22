import { isTest } from "./environment.js";

export default (fn) => (req, res, next) => {
  if (isTest()) return fn(req, res, next);
  return fn(req, res, next).catch(next);
};

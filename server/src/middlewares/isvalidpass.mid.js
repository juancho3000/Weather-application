import { users } from "../data/mongo/managerMongo.js";
import isValidPass from "../utils/isValidPass.js";

async function isValidPassMid(req, res, next) {
  try {
    const { email, password } = req.body;
    const one = await users.readByEmail(email);
    const dbPassword = one.password;
    isValidPass(password, dbPassword);
    return next();
  } catch (error) {
    return next(error);
  }
}
export default isValidPassMid;

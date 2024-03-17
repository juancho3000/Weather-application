import has8Char from "../utils/has8char.js";

function has8charMid(req, res, next) {
  try {
    const {password} = req.body;
    has8Char(password);
    return next();
  } catch (error) {
    return next(error);
  }
}
export default has8charMid;
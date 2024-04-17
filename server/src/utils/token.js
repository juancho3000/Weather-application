import jsonwebtoken from "jsonwebtoken";
const {SECRET_KEY} = process.env

function createToken(data) {
  const token = jsonwebtoken.sign(data, SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
};

function verifyToken(token) {
  if (token) {
    const data = jsonwebtoken.verify(token, SECRET_KEY);
    return data;
  }
  const error = new Error("bad auth");
  error.statusCode = 401;
  throw error;
};
export { createToken, verifyToken };

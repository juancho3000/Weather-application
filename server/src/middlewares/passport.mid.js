import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.js";
import { users } from "../data/mongo/managerMongo.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await users.readByEmail(email);
        if (one) {
          return done(null, false);
        } else {
          let userData = req.body;
          userData.password = createHash(password);
          let user = await users.create(userData);
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        if (user) {
          const verify = verifyHash(password, user.password);
          if (verify) {
            req.session.email = email;
            req.session.role = user.role;
            return done(null, user);
          } else {
            return done(null, false);
          }
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;

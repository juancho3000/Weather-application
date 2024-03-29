import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { createHash, verifyHash } from "../utils/hash.js";
import { users } from "../data/mongo/managerMongo.js";
import {createToken} from "../utils/token.js";

const GOOGLE_ID =
  "764867270826-ce1d6018f2k9rck2coclg60m3dqbvu9c.apps.googleusercontent.com";
const GOOGLE_CLIENT = "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";
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
        if (user && verifyHash(password, user.password)) {
            /*req.session.email = email;
            req.session.role = user.role;*/
            const token = createToken({email, role:user.role})
            req.token=token
            return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy( 
  {
    passReqToCallback: true,
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_CLIENT,
    callbackURL: "http://localhost:8080/api/sessions/google/callback",
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      let user = await users.readByEmail(profile.id);
      if (user) {
        req.session.email = profile.id;
        req.session.role = user.role;
        return done(null, user);
      } else {
        user = {
          email: profile.id,
          name: profile.name.givenName,
          lastName: profile.name.familyName,
          photo: profile.coverPhoto,
          password: createHash(profile.id),
        };
        user = await users.create(user);
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;

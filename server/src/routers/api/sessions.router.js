import { Router } from "express";
//import { users } from "../../data/mongo/managerMongo.js";
import has8charMid from "../../middlewares/has8char.mid.js";
//import inValidPassMid from "../../middlewares/isvalidpass.mid.js"
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

//register - ednpoint
sessionsRouter.post("/register", has8charMid, passport.authenticate("register",{session: false, failureRedirect: "/api/sessions/badAuth"}) ,async (req, res, next) => {
  try{
    return res.json({
      statusCode: 201,
      message: "Registered account"
    })
  } catch(error){
    return next(error)
  }
})
//register - endpoint

//login - endpoint
sessionsRouter.post("/login", passport.authenticate("login", {session: false, failureRedirect: "/api/sessions/badAuth"}), async (req, res, next) => {
  try {
      return res.json({
        statusCode: 200,
        message: "Successfully logged in!",
        session: req.session,
      });
  } catch (error) {
    return next(error);
  }
});
//login - endpoint

//checking if already logged - ednpoint
sessionsRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "Session with email:" + req.session.email,
      });
    } else {
      const error = new Error("Bad authentication");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});
//checking if already logged - endpoint

//logout - endpoint
sessionsRouter.post("/logout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "logged out",
      });
    } else {
      const error = new Error("Non existent authentication");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});
//logout - endpoint

//bad auth - endpoint
sessionsRouter.get("/badAuth", (req, res, next) => {
  try{
    return res.json({
      statusCode:401,
      message: "bad authentication"
    })
  } catch(error){
    return next(error)
  }
})
//bad auth - endpoint

export default sessionsRouter;

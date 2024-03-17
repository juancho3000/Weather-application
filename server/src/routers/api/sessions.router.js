import { Router } from "express";
import { users } from "../../data/mongo/managerMongo.js";
import has8charMid from "../../middlewares/has8char.mid.js";
import inValidPassMid from "../../middlewares/isvalidpass.mid.js"

const sessionsRouter = Router();

//register - ednpoint
sessionsRouter.post("/register", has8charMid, async (req, res, next) => {
  try{
    const data = req.body
    await users.create(data)
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
sessionsRouter.post("/login", inValidPassMid, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password === "Juancho3000.") {
      req.session.email = email;
      req.session.role = "admin"
      return res.json({
        statusCode: 200,
        message: "Successfully logged in!",
        session: req.session,
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

export default sessionsRouter;

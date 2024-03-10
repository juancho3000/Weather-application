import { Router } from "express";

const sessionsRouter = Router();

sessionsRouter.post("/login", async (req, res, next) => {
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

import { Router } from "express";
import { users } from "../../data/mongo/managerMongo.js";
//import userEvents from "../../data/fs/userManager.js";
//import propsProducts from "../../middlewares/propsProducts.mid.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
    return res.json({
      statusCode: 201,
      message: "successfully created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
    };
    const filter = {};
    if (req.query.email) {
      filter.email = new RegExp(req.query.email.trim(), "i");
    }
    if (req.query.name == "desc") {
      orderAndPaginate.sort.name = -1;
    }
    const all = await users.read({ filter, orderAndPaginate });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readOne(uid);
    return res.json({
      statusCode: 200,
      responsse: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid, quantity } = req.params;
    const data = req.body;
    const one = await users.update(data, uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await users.destroy(uid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
export default usersRouter;

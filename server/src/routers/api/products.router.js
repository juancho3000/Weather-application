import { Router } from "express";
//import events from "../../data/fs/events.js";
//import propsProducts from "../../middlewares/propsProducts.mid.js";
import { products } from "../../data/mongo/managerMongo.js";
const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
    return res.json({
        statusCode: 201,
        message: "successfully created",
        response,
      });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.read({});
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.json({
        statusCode: 404,
        message: one,
      });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid/:quantity", async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const response = await products.update(quantity, pid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "capacity available:" + response,
      });
    } else if (response === "There isn't any product") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.destroy(pid);
    return res.json({
        statusCode: 404,
        message: response,
      });
  } catch (error) {
    return next(error);
  }
});
export default productsRouter;

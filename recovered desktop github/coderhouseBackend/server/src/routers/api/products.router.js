import { Router } from "express";
import events from "../../data/fs/events.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

productsRouter.post("/", propsProducts ,async (req, res, next) => {
  try {
    const data = req.body;
    const response = await events.createEvent(data);
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
    const all = await events.readEvents();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: all,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productId = await events.readEventById(pid);
    if (typeof productId === "string") {
      return res.json({
        statusCode: 404,
        message: productId,
      });
    } else {
      return res.json({
        statusCode: 200,
        responsse: productId,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid/:quantity", async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const response = await events.soldTicket(quantity, pid);
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
    const response = await events.removeEventById(pid);
    if (response === "There are no events with this ID to delete" + id) {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});
export default productsRouter;

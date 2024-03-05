import { Router } from "express";
import productsViewRouter from "./products.view.js";
import userViewRouter from "./user.view.js";

const viewRouter = Router();

viewRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = [
        {name: "product1", price: 5, stock: 10},
        {name: "product2", price: 8, stock: 20}
    ]
    const date = new Date()
    return res.render("index", {products: mainProducts , date, title: "INDEX"});
  } catch (error) {
    next(error);
  }
});

viewRouter.use("/productos", productsViewRouter)
viewRouter.use("/uvw", userViewRouter)


export default viewRouter;

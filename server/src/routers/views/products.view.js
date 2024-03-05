import { Router } from "express";
import events from "../../data/fs/events.js";

const productsViewRouter = Router();

productsViewRouter.get("/", async (req, res, next) => {
    try{
        const all = await events.readEvents()
        return res.render("products" , {products: all})
    } catch (error){
        next(error)
    }
})

productsViewRouter.get("/reg", (req, res, next) => {
    try{
        return res.render("register")
    } catch (error) {
        next(error)
    }
})

export default productsViewRouter;
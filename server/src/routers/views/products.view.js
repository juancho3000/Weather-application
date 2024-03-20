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

productsViewRouter.get("/create", (req, res, next) => {
    try{
        return res.render("createProduct")
    } catch (error) {
        next(error)
    }
})

export default productsViewRouter;
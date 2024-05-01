import { Router } from "express";
import events from "../../data/fs/events.js";
import { products } from "../../data/mongo/managerMongo.js";

const productsViewRouter = Router();

productsViewRouter.get("/", async (req, res, next) => {
    try{
        const all = await events.readEvents();
        return res.render("products",{products:all}) 
        
    } catch (error){
        next(error)
    }
})

productsViewRouter.get("/dbprods", async (req, res, next) => {
    try{
        const all = await products.read({})
        return res.render("products",{dbProds:all},console.log("db products:",all)) 
        
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
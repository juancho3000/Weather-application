import { Router } from "express";
import { orders } from "../../data/mongo/managerMongo.js"

const ordersRouter = Router();

ordersRouter.post("/", async (req, res, next) => {
    try{
        const data = req.body;
        const response = await orders.create(data);
        return res.json({ 
            statusCode: 201,
            message: "successfully created",
            response,
    })
    } catch (error) {
        return next (error)
    }
})

ordersRouter.get("/:uid", async (req, res, next) => {
    try{
        const { uid }= req.params
        const filter = { user_id: uid }
        const all = await orders.read({filter});
        return res.json ({
            statusCode: 200,
            response: all
        })
    } catch (error) {
        return next (error)
    }
})

ordersRouter.get("/:oid", async (req, res, next) => {
    try{
        const { oid } = req.params;
        const data = req.body;
        const one = await orders.readOne(oid, data);
        return res.json({
            statusCode: 200,
            response: one,
        })
    } catch (error) {
        return next (error)
    }
})

ordersRouter.delete("/oid", async (req, res, next) => {
    try{
        const { oid } = req.params
        const one = await orders.destroy(oid)
        return res.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return next (error)
    }
})

export default ordersRouter;
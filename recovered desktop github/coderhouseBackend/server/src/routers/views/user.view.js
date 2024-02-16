import { Router } from "express";
import userEvents from "../../data/fs/userManager.js";

const userViewRouter = Router();

userViewRouter.get("/", async (req, res, next) => {
    try{
        const all = await userEvents.readEvents()
        return res.render("profile" , {profile: all})
    } catch (error){
        next(error)
    }
})

userViewRouter.get("/chat", (req, res, next) => {
    try{
        return res.render("chat", {})
    } catch (error) {
        next(error)
    }
})

userViewRouter.get("/:uid", async (req, res, next) => {
    try{
        const { uid } = req.params;
        const one = userEvents.readEventById(uid);
        if(!one) {
            return res.render("not found ", {not: "user", title: "not found"});
        }
        return res.render("profile", {profile: one, title: "PROFILE"})
    } catch (error) {
        next(error)
    }
})

export default userViewRouter;
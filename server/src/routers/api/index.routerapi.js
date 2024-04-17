import usersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.js";
import CustomRouter from "../customRouter.js";
import passportCallBackMid from "../../middlewares/passportCallBack.mid.js";

const product = new ProductsRouter(); 

export default class RouterApi extends CustomRouter{
    init(){
        this.router.use("/users", usersRouter);
        this.router.use("/products", product.getRouter());
        this.router.use("/orders", passportCallBackMid("jwt", {session: false}) , ordersRouter);
        this.router.use("/sessions", sessionsRouter);
    }
}
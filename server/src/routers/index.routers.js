import RouterApi from "./api/index.routerapi.js";
import ViewsRouter from "./views/index.view.js";
import CustomRouter from "./customRouter.js";

const api = new RouterApi()
const views = new ViewsRouter();
const viewRouter = views.getRouter();

export default class IndexRouter extends CustomRouter{
    init(){
        this.router.use("/api", api.getRouter());
        this.router.use("/", viewRouter);
    }
}


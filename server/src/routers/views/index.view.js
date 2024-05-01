import ProductsRouter from "../api/products.router.js";
import userViewRouter from "./user.view.js";
import CustomRouter from "../customRouter.js";
import productsViewRouter from "./products.view.js";
import { products } from "../../data/mongo/managerMongo.js";
//import { removeAllListeners } from "nodemon";

const product = new ProductsRouter()

export default class ViewsRouter extends CustomRouter{
  init(){
    this.router.use("/productos", productsViewRouter)
    this.router.use("/uvw", userViewRouter)
    this.read("/", async (req, res, next) => {
      try {
        
          /*const mainProducts = [
              {name: "product1", price: 5, stock: 10},
              {name: "product2", price: 8, stock: 20}
          ]
          const date = new Date()
          return res.render("index", {products: mainProducts , date, title: "INDEX"});*/
        
        const mainProducts = { 
            limit: req.query.limit || 5,
            page: req.query.page || 1,
            sort: {title:1},
            lean: true,
      }
    
      const filterProds = {};
      if(req.query.title){
        filterProds.title = new RegExp(req.query.title.trim(), "i");
      }
      if(req.query.sort === "desc"){
        mainProducts.sort.title = "desc"
      }
        const renderData = await products.read({filterProds,mainProducts})
        return res.render("index", {
          products: renderData.docs,
          next: renderData.nextPage,
          prev: renderData.prevPage,
          title: "INDEX",
          filter: req.query.title,
        });
      } catch (error) {
        next(error);
      }
    });
  }
} 




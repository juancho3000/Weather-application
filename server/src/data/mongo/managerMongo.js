import Users from "./models/userModel.js";
import Products from "./models/productsModel.js";
import Order from "./models/ordersModel.js";
import notFoundID from "../../utils/notFoundID.js";

class mongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }
  async read(filter, order) {
    try {
      const all = await this.model.find(filter, "-createdAt -updatedAt -__v").sort(order);
      if (all.length === 0) {
        const error = new Error("There are no products to see");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundID(one)
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true }
      const one = await this.model.findByUpdate(id, data, opt);
      notFoundID(one)
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundID(one)
      return one;
    } catch (error) {
      throw error;
    }
  }

  async stats({ filter }) {
    try{
      let stats = await this.model.find(filter).explain("executionStats")
    } catch(error){
      throw error
    }
  }

}

const users = new mongoManager(Users);
const products = new mongoManager(Products);
const orders = new mongoManager(Order)
export {users, products, orders};
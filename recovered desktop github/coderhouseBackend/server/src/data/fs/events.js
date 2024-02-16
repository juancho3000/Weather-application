import fs from "fs";
import crypto from "crypto";
class EventsManager {
  static #perGain = 0.3;
  static #totalGain = 0;
  //events = []
  init() {
    try {
      const exists = fs.existsSync(this.path);
      console.log(exists);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.events = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.events = [];
    this.init();
  }

  //creating data - begining
  async createEvent(data) {
    try {
      const event = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        place: data.place,
        img: data.img,
        price: data.price || "$" + 10,
        capacity: data.capacity || 50,
        date: data.date || new Date(),
      };
      this.events.push(event);
      const jsonData = JSON.stringify(this.events, null, 2);

      await fs.promises.writeFile(this.path, jsonData);
      fs.promises.readFile("create:" + event.id);
      return event.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  //creating data - end

  //reading data - begining
  readEvents() {
    try {
      if (this.events.length === 0) {
        throw new Error("there is no data");
      } else {
        console.log(this.events);
        return this.events;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  //reading data - end

  //reading single selected id data - begining
  readEventById(id) {
    try {
      const one = this.events.find((each) => each.id === id);
      if (!one) {
        throw new Error("no events found with id:" + id);
      } else {
        console.log("read event id:" + id);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  //reading single selected id data - begining

  //deleteEventById
  async removeEventById(id) {
    try {
      let one = this.events.find((each) => each.id === id);
      if (!one) {
        throw new Error("There are no events with this ID to delete");
      } else {
        this.events = this.events.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.events, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("deleted:" + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  //deleteEventById

  //operation to sell tickets according to capacity - begining
  async soldTicket(quantity, eid) {
    try {
      const one = this.readEventById(eid);
      if (one) {
        if (one.capacity >= quantity) {
          one.capacity = one.capacity - quantity;
          EventsManager.#totalGain =
            EventsManager.#totalGain +
            one.price * quantity * EventsManager.#perGain;

          const jsonData = JSON.stringify(this.events, null, 2);
          await fs.promises.writeFile(this.path, jsonData);
          console.log("capacity available:" + one.capacity);
          return one.capacity;
        } else {
          throw new Error("Capacity isn't enough");
        }
      } else {
        throw new Error("There isn't any product");
      }
    } catch (error) {
      console.log("no product sold", error.message);
      return error.message;
    }
  }
  //operation to sell tickets according to capacity - end
}
const events = new EventsManager("./server/src/data/fs/files/events.json");
const route = "./server/src/data/fs/files/events.json";
let config = "utf-8";
fs.promises
  .readFile(route, config)
  .then((res) => ((res)))
  .catch((err) => console.log("error promise read" + err));
export default events;

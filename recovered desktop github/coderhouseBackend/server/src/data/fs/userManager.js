import fs from "fs";
import crypto from "crypto";
class UserManager {
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
        img: data.img || "https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg",
        email: data.email,
        phone: data.phone,
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
        throw new Error("no users found with id:" + id);
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

 
}
const userEvents = new UserManager("./server/src/data/fs/files/userManager.json");
const route = "./server/src/data/fs/files/userManager.json";
let config = "utf-8";
fs.promises
  .readFile(route, config)
  .then((res) => ((res)))
  .catch((err) => console.log("error promise read" + err));
export default userEvents;

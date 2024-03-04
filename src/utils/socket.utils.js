import events from "../data/fs/events.js";
import { socketServer } from "../../server.js";

const messages = [];

export default (socket) => {
    console.log("socket id:",socket.id);
    socket.on("user", () => {
        socket.emit("new chat messages:", messages);    
    })
    socket.emit("messages", messages);
    socket.on("new message", data => {
        messages.push(data);
        socketServer.emit("new chat messages:", messages);
        console.log("new chat messages:", messages);
    })
    socket.emit("welcome", "welcome to Worldsthenics")
    socket.emit("productsList" , events.readEvents())
    socket.on("new product added", async (data) =>{
        try{
        console.log("added:",data);
         await events.createEvent(data)
         socket.emit("product added success", "added succesfully")
        } catch (error) {
            console.log("product added error:",error);   
        }
    })
}
import "dotenv/config.js"; 

import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import {createServer} from "http";

import dbConnection from "./server/src/utils/db.js";
import IndexRouter from "./server/src/routers/index.routers.js"
import errorHandler from "./server/src/middlewares/errorHandler.mid.js";
import pathHandler from "./server/src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import socketUtils from "./server/src/utils/socket.utils.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";

const {DB_LINK} = process.env

//server
const server = express();
const PORT = 8080;
const callBack = () => {
    console.log("servidor listo ahora mismo en puerto:" + PORT);
    dbConnection();
};
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, callBack);
socketServer.on("connection", socketUtils);
//server

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set( "views",__dirname + "/server/src/views");
//templates

//middlewares
const FileStore = sessionFileStore(expressSession)
server.use(cookieParser(process.env.SECRET_KEY));
server.use(expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        ttl: 7 * 24 * 60 * 60,
        mongoUrl: DB_LINK,
    }),
}))
/*
server.use(expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        path: "server/src/data/fs/files/sessions",
        ttl: 10,
        cookie: {maxAge: 60000}
        retries:3
    })
}))*/
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static("server/public"));
server.use(morgan("dev"));
//middlewares

//endpoints
const router = new IndexRouter()
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);
//endpoints

export {socketServer};
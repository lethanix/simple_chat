import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use("/", viewsRouter);

const server = app.listen(PORT, () => {console.log(`App listening on port ${PORT}`)})
// Socket Logic
const socketServer = new Server(server);

const messages = [];
socketServer.on("connection", (socketClient) => {
    // Logic to implement
    console.log(`Socket Client connected: ${socketClient.id}`);

    socketServer.emit("log", messages);

    socketClient.on("authenticated", username => {
        socketClient.broadcast.emit("newUserConnected", username);
    })

    socketClient.on("message", (messageData) => {
        console.log(messageData);
        messages.push(messageData);

        socketServer.emit("log", messages);
    })
})
const { app } = require("./app.js");
const httpServer = require("http")
const { Server } = require("socket.io")
const mongoose = require('mongoose');
const Db = "mongodb://localhost:27017/UserProfile";
const socket  = require("./controller/socketImplement.js")
const config = require('./config/config.js');
const Socketauth = require("./middleware/socket_middleware.js")
const Port = config.app.port || 3000;


const server = new httpServer.createServer(app)

mongoose.connect(Db).then(() => {
    console.log("Db is Connet")
}).catch((err) => {
    console.log("Somthing Wrong in Db Connection", err)
})
const io = new Server(server, {
    cors: {
        // origin: "http://localhost:5173",
        origin: "*",
        methods: ['GET', 'POST'],   
    }
});

io.use(Socketauth.socketid)
io.use(Socketauth.socketauth)
socket(io)

// module.exports =  io
server.listen(Port, () => {
    console.log(`soket server is running ${Port}`)
})
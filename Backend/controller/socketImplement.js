
const Chat  = require("../models/Chat_model")
async function socket(io) {
    io.on('connection', (socket) => {
        socket.on('getUsers', () => {
            const users = [];
            for (let [id, socket] of io.of("/").sockets) {
                users.push({
                    userID: id,
                    username: socket.username,
                });
            }
            socket.emit("users", users); 
        });
        
        console.log(`${socket.id} user just connected!`);
        const userId = socket.userid
        const random= Math.floor(Math.random()*100000)
        // console.log(userId+"_"+random)
        // socket.join(userId+random);

        // socket.on("message", (data) => {
        //     io.emit("newResponsemessage", data);
        //     console.log("1", data);
        // });
        // // socket.broadcast.emit("user connected", users);
        socket.on("likepost", (data) => {
            console.log(data)
            io.emit("likedpost", data)
        })


        socket.on("sendMessage", async (data) => {
            // console.log(`Message received from ${data.from} to ${data.to}: ${data.message}`);
            console.log(data)
            try {
                // Find the existing chat between the two users
                let chat = await Chat.findOne({
                    participants: { $all: [data.from, data.to] }
                });
        
                if (chat) {
                    // If the chat exists, push the new message to the messages array
                    chat.messages.push({
                        from: data.from,
                        to: data.to,
                        message: data.message,
                    });
                } else {
                    // If no chat exists between the two users, create a new chat document
                    chat = new Chat({
                        participants: [data.from, data.to],
                        messages: [{
                            from: data.from,
                            to: data.to,
                            message: data.message,
                        }]
                    });
                }
        
                // Save the chat (either updated or new)
                await chat.save();
        
                // Emit the message to the recipient's room
                io.to(data.to).emit("receiveMessage", data);
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });
        
        
        socket.on("disconnect", () => {
            console.log("A user disconnected");
            // users = users.filter((user) => user.socketID !== socket.id);
            // console.log(users);
            // socket.emit("user connected ", users);
            socket.disconnect();

        });
    });
}


module.exports = socket


// async function socket (io) {
//     io.on('connection', (socket) => {
//         // console.log(`⚡: ${socket.id} user just connected!`);

//         socket.on("message", (data) => {
//             console.log(data.username)
//             io.emit('message', data)
//         })
//         socket.on('disconnect', () => {
//             console.log('🔥: A user disconnected');
//         });
//     });
// }
// io.on('connection',async function (socket) {
//         // console.log(`⚡: ${socket.id} user just connected!`);
//         socket.on("message", (data) => {
//             console.log(data);
//             io.emit('message', data);
//         });
//         socket.on('disconnect', () => {
//             console.log('🔥: A user disconnected');
//         });
//     });

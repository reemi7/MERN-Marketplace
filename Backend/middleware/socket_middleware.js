
const socketauth = async (socket, next) => {
    console.log("jwt token")
    const token = socket.handshake.auth.token;
    const username = socket.handshake.auth.username
    const userId = socket.handshake.auth.userID
    console.log(username)
    console.log(userId)
    if(!token){
        return next(new Error("invalid user"))
    }
    console.log(token)
    socket.username = username
    socket.userid = userId
    
    next()
}
const socketid = async (socket, next) => {
    console.log("id")
    console.log(socket.id)
    next()
}

module.exports = { socketauth, socketid }
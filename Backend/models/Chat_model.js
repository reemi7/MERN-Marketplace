const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
const chatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User 1
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }  // User 2
  ],
  messages: [messageSchema], // Array of message objects
});

const Message = mongoose.model("Message", chatSchema);

module.exports = Message;

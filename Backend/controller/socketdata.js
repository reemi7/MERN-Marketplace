const Chat = require("../models/Chat_model");

const getmessage =  async (req, res) => {
    const { userId, postOwnerId } = req.params;

    try {
        let messages = await Chat.findOne({
            participants: { $all: [userId, postOwnerId] }
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Error fetching chat history" });
    }
}

module.exports = getmessage
const Message = require('../Models/messageModel');


exports.sendMessage = async (req, res) => {
  try {
    const {sender_id, content } = req.body;
     // replace with req.user.id when JWT middleware is ready

    const result = await Message.create(sender_id, content);

    res.status(201).json({ message: 'Message sent', data: result });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all messages for a user (including broadcasts)
exports.getMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.getAllMessagesForUser(userId);

    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all broadcast (general) messages
exports.getBroadcasts = async (req, res) => {
  try {
    const broadcasts = await Message.getBroadcast();
    console.log(broadcasts);
    
    res.status(200).json(broadcasts);
  } catch (err) {
    console.error('Error fetching broadcasts:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

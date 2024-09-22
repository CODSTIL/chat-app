import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
  try {

    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Check if 'message' is provided
    if (!message) {
      return res.status(400).json({ error: "Bad Request - 'message' field is required." });
    }

    // Find existing conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    // If no conversation exists, create one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
      console.log("Created new conversation:", conversation);
    } else {
      console.log("Found existing conversation:", conversation);
    }

    // Create a new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message
    });
     
     // socket io functionality

    console.log("Created new message:", newMessage);

    // Associate the message with the conversation
    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(),newMessage.save()]);
    console.log("Message associated with conversation and saved.");

    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};


export const getMessages = async(req,res) => {

   console.log("get all messages");

   const {id:userToChatId} = req.params;
   const senderId = req.user._id;

   const conversation = await Conversation.findOne({
    participants:{$all:[userToChatId,senderId]}
   }).populate("messages");


   if(!conversation) return res.status(200).json([]);
   
   const messages = conversation.messages

   res.status(200).json(messages);

   try{

   }catch (error) {
    console.error("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
} 
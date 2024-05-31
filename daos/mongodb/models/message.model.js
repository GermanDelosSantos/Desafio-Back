import mongoose from 'mongoose';

export const messagesCollectionName = "messages";

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const MessageModel = mongoose.model(messagesCollectionName, messageSchema);

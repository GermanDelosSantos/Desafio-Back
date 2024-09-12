import mongoose from "mongoose";
import config from '../../../config/config.js'
import 'dotenv/config';
import {logger} from "../../../logs/logger.js";
const MONGO_URL = 'mongodb+srv://noiconuf:admin@cluster0.qu7hol7.mongodb.net/coderBack?retryWrites=true&w=majority&appName=Cluster0' 

export const initMongoDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGO_URL);
    logger.info("Conectado a la base de datos de MONGODB");
  } catch (error) {
    logger.error(error);
  }
};
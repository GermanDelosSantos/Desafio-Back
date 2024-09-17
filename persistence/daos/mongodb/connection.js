import mongoose from "mongoose";
import config from '../../../config/config.js'
import 'dotenv/config';
import {logger} from "../../../logs/logger.js";

export const initMongoDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.MONGO_URL);
    logger.info("Conectado a la base de datos de MONGODB");
  } catch (error) {
    logger.error(error);
  }
};
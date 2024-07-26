import mongoose from "mongoose";
import 'dotenv/config'

const MONGO_URL = 'mongodb+srv://noiconuf:admin@cluster0.qu7hol7.mongodb.net/coderBack?retryWrites=true&w=majority&appName=Cluster0' 

export const initMongoDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGO_URL);
    console.log("Conectado a la base de datos de MONGODB");
  } catch (error) {
    console.log(error);
  }
};
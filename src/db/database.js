import mongoose from "mongoose";
import 'dotenv/config';

const MONGO_URL = process.env.MONGO_URL

export const initMongoDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(MONGO_URL);
        console.log("Todo ok")
    } catch (error) {
        console.log(error);
    }
}
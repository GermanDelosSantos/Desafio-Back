import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

export const userCollectionName = "users";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
});

export const UserModel = model(userCollectionName, UserSchema);
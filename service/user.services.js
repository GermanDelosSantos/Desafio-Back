import { UserModel } from "../daos/mongodb/models/user.model.js";
import UserDaoMongoDB from "../daos/mongodb/user.dao.js";
import { createHash, isValidPassword } from "../utils.js";
import { isValidObjectId } from 'mongoose';

const userDao = new UserDaoMongoDB();

export const getByIdUser = async (id) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid ObjectId');
    }
    const user = await userDao.getById(id);
    if(!user) return false;
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving user by ID");
  }
};

export const getByEmailUser = async (email) => {
  try {
    const [user] = await userDao.getByEmail(email);
    if(!user) return false;
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving user by email");
  }
};

export const createUser = async (obj) => {
  try {
    const newUser = await userDao.create(obj);
    if (!newUser) throw new Error("Validation Error!");
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user");
  }
};

export const updateUser = async (id, obj) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid ObjectId');
    }
    let item = await userDao.getById(id);
    if (!item) {
      throw new Error("User not found!");
    }
    const userUpdated = await userDao.update(id, obj);
    return userUpdated;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user");
  }
};

export const deleteUser = async (id) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid ObjectId');
    }
    const userDeleted = await userDao.delete(id);
    return userDeleted;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting user");
  }
};

export const getAllUsers = async (page, limit, name, sort) => {
  try {
    return await userDao.getAll(page, limit, name, sort);
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving users");
  }
};

export const login = async (email, password) => {
  try {
    const [user] = await userDao.getByEmail(email);
    if (!user) {
      throw new Error("Authentication failed");
    }
    if (isValidPassword(password, user)) {
      return user;
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

export const register = async (email, password, additionalInfo) => {
  try {
    let [user] = await userDao.getByEmail(email);
    if (user) {
      throw new Error("User exists");
    }
    const hashedPassword = createHash(password);
    user = {
      ...additionalInfo,
      email,
      password: hashedPassword,
      role: email === "adminCoder@coder.com" && password === "adminCod3r123" ? "admin" : "user",
    };
    const newUser = await userDao.create(user);
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};
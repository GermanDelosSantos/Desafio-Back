import { MessageModel } from "./models/message.model.js";

export default class MessageDaoMongoDB {
  async getAll() {
    try {
      const response = await MessageModel.find({});
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const response = await MessageModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const response = await MessageModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await MessageModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const response = await MessageModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

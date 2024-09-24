import MessageDaoMongoDB from '../persistence/daos/mongodb/message.dao.js';

const msgDao = new MessageDaoMongoDB();

export const getAll = async () => {
  try {
    return await msgDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};

export const getMessageById = async (id) => {
  try {
    return await msgDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    return await msgDao.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (id, obj) => {
  try {
    return await msgDao.update(id, obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await msgDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};

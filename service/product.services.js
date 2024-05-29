import ProductDaoMongoDB from '../daos/mongodb/product.dao.js'
// import ProductDaoFS from '../daos/filesystem/product.dao.js';
// import {__dirname} from '../utils.js';
// const prodDao = new ProductDaoFS(`${__dirname}/daos/filesystem/products.json`);
const prodDao = new ProductDaoMongoDB();


export const getAll = async () => {
  try {
    return await prodDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};

export const getProductById = async (id) => {
  try {
    return await prodDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    return await prodDao.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (id, obj) => {
  try {
    return await prodDao.update(id, obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await prodDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};
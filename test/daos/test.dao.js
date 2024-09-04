//https://nodejs.org/api/test.html
import { describe, test, before } from "node:test";
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { logger } from "../logs/news.logs.js";
import ProductDaoMongo from "../../persistence/daos/mongodb/product.dao.js";
import { generateFakerProduct } from '../../src/utils/product.utils.js'


const prodDao = new ProductDaoMongo();



describe('conjunto de pruebas product dao', () => {
  before(async () => {
    DaoMongo.init();
    await mongoose.connection.collections["test"].drop();
    logger.info("se limpio la base de datos");
  });

  test('deberia retornar todas los productos de la coleccion', async()=>{
    const products = await prodDao.getAll();
    assert.equal(Array.isArray(products), true);    //=
    assert.deepEqual(products.length, 0)            //==
    assert.deepStrictEqual(products, []);           //===
    assert.notEqual(products, {});
    assert.doesNotThrow(() => products);
  });

  test('deberia registrar un producto', async()=>{
    const body = generateFakerProduct();
    const response = await prodDao.create(body);
    const products = await prodDao.getAll();
    assert.ok(response, '_id');
    assert.deepStrictEqual(response.name, body.name);
    assert.equal(products.length, 1);
  })
});
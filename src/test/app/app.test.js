import request from 'supertest';
import mongoose from 'mongoose';
import { fakerES as faker } from '@faker-js/faker';
import { logger } from "../../logs/logger.js";
import { generateFakerProduct } from '../../utils/product.utils.js';
import app from'../../server.js'
import express from 'express';
import 'dotenv/config';



describe('Pruebas API de Productos', () => {

  // Antes de correr los tests, aseguramos que la colección de productos se limpie si ya existe
  beforeAll(async () => {
    const collection = mongoose.connection.collections["test"];
    if (collection) {
      await collection.drop();
    }
    console.log(response.body);
  });

  // Test para crear un producto
  test('[POST] /test/test-createprod - Crear un nuevo producto', async () => {
    const newProduct = generateFakerProduct();
    

    const response = await request(app)
      .post('/test/test-createprod') // Ruta actualizada según tu configuración
      .send(newProduct);

    expect(response.statusCode).toBe(200); // Esperamos un código 200 si todo salió bien
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
    expect(response.body.price).toBe(newProduct.price);
    expect(response.body.stock).toBe(newProduct.stock);
  });

  // Test para obtener todos los productos
  test('[GET] /test/test-getallprod - Obtener todos los productos', async () => {
    const response = await request(app)
      .get('/test/test-getallprod') 


    expect(response.statusCode).toBe(200); 
    expect(response.body).toBeInstanceOf(Array); 
    expect(response.body.length).toBeGreaterThan(0); 
  });

  test('[GET] /test/test-createprod - Obtener un producto por ID', async () => {
    const newProduct = generateFakerProduct();

    const createResponse = await request(app)
      .post('/test/test-createprod')
      .send(newProduct);

    const productId = createResponse.body._id;


    const response = await request(app)
      .get(`/test/${productId}`); 

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body._id).toBe(productId);
    expect(response.body.name).toBe(newProduct.name);
  });

  test('[GET] /test/:id - Obtener un producto con un ID inexistente', async () => {
    const fakeId = '507f191e810c19729de860ea'; 

    const response = await request(app)
      .get(`/test/${fakeId}`);

    expect(response.body.msg).toBe(`No se encontró el id ${fakeId} en la base de datos.`);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
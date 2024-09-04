import app from '../../server.js';
import request from 'supertest';
import mongoose from 'mongoose';
import { fakerES as faker } from '@faker-js/faker';
import { logger } from "../../logs/logger.js";
import { generateFakerProduct } from '../../src/utils/product.utils.js'




describe('Conjunto de pruebas de API Desbordadas', ()=>{
    beforeAll(async () => {
        await mongoose.connection.collections["test"].drop();
        logger.info("se limpio la base de datos");
      });

      test('[POST] /test', async()=>{
        const body = generateFakerProduct();
        const response = await request(app).post('/test-createprod').send(body);
        // console.log(response.body);
        const id = response.body._id;
        const nameResponse = response.body.name;
        const nameExpected = body.name;
        const statusCode = response.statusCode;
        expect(id).toBeDefined();
        expect(response.body).toHaveProperty('_id');
        expect(nameResponse).toBe(nameExpected); 
        expect(nameResponse).toEqual(nameExpected);    
        expect(statusCode).toBe(200)
      });

      test('[GET] /test', async()=>{
        const response = await request(app).get('/test-getallprod');
        const statusCode = response.statusCode;
        expect(statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body).toBeInstanceOf(Array);
        const dateNews = response.body[0].date;
        // console.log(new Date().getFullYear())
        const dateExpected = expect.stringContaining(new Date().getFullYear().toString());
        expect(dateNews).toEqual(dateExpected);
      });

      test('[GET] /test/:id', async()=>{
        const body = generateFakerProduct();
        const response = await request(app).post('/test').send(body);
        const { _id } = response.body;
        const responseGetById = await request(app).get(`/test/${_id}`);
        expect(responseGetById.statusCode).toBe(200);
/* ------------------------------------ - ----------------------------------- */
        const idFalse = '507f191e810c19729de860ea';
        const responseGetByIdNotFound = await request(app).get(`/test/${idFalse}`);
        const msgNotFound = `No se encontró el id ${idFalse} en la base de datos.`
        expect(responseGetByIdNotFound.statusCode).toBe(404);
        expect(responseGetByIdNotFound.body.msg).toEqual(msgNotFound);
      })

      afterAll(async()=>{
        await mongoose.disconnect();
      })
})
import { productRouter } from "./product";
import express from 'express';
import request from 'supertest';


const app = express()
productRouter(app);

describe('Product GET', () => {
    test('/ check if all the products were fetched', (done) => {
        request(app)
            .get('/api/products')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});

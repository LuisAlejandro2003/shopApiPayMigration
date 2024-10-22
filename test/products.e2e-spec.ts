import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let productId: string;

  it('/api/v1/products (POST) should create a product', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/products')
      .send({
        name: 'Laptop Asus 3',
        brand: 'Asus',
        category: 'electronics',
        price: 1200,
        description: 'Gaming Laptop 2',
      })
      .expect(201);

    productId = response.body.id;

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Laptop Asus 3');
  });

  it('/api/v1/products/:id (GET) should get a product by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/v1/products/${productId}`)
      .expect(200);

    expect(response.body.id).toBe(productId);
    expect(response.body.name).toBe('Laptop Asus 3');
  });

  it('/api/v1/products/:id (PATCH) should update the product', async () => {
    await request(app.getHttpServer())
      .patch(`/api/v1/products/${productId}`)
      .send({
        price: 1400,
      })
      .expect(200);

    const updatedResponse = await request(app.getHttpServer())
      .get(`/api/v1/products/${productId}`)
      .expect(200);

    expect(updatedResponse.body.price).toBe(1400);
  });

  it('/api/v1/products/:id (DELETE) should delete the product', async () => {
    await request(app.getHttpServer())
      .delete(`/api/v1/products/${productId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/api/v1/products/${productId}`)
      .expect(404);
  });
});

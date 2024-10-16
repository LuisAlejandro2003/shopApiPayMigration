import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('PaymentController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/payments (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/payments')
      .send({ title: 'Test Payment', price: 100 })
      .expect(201)
      .expect((response) => {
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.title).toEqual('Test Payment');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

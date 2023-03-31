import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const user = {
    email: 'john' + Math.random() * 1000 + '@incubyte.co',
    password: '123',
  };

  it('auth/signup (POST) - should return the created user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(user);
    expect(response.status).toBe(201);
  });

  it('/signin (POST) - should return the token for loggedin user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(user);
    expect(response.status).toBe(201);
  });
});

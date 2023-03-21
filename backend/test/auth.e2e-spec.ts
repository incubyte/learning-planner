import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('auth/signup (POST) - should return the created user', async () => {
    const user = {
      email: 'john@incubyte.co',
      password: '123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(user);

    expect(response.status).toBe(201);
  });

  it('/signin (POST) - should return the token for loggedin user', async () => {
    const user = {
      email: 'john@incubyte.co',
      password: '123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(user);
    expect(response.status).toBe(201);
  });
});
